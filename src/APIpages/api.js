import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cartSlice } from "./reducers/cartReducer";
import storage from "redux-persist/lib/storage"; //рушій localStorage для персіста
import {
  persistReducer,
  persistStore,
  FLUSH, //localStoredReducer, екшони та таке інше
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { feedSlice } from "./reducers/feedReducer";

export const BACKEND_HOSTNAME = "shop-roles.node.ed.asmer.org.ua";
export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `http://${BACKEND_HOSTNAME}/graphql`,
    prepareHeaders(headers, { getState }) {
      const { token } = getState().auth; //отримуємо токен
      if (token) {
        //якщо ми залогінени
        headers.set("Authorization", "Bearer " + token); //додаємо токен до заголовків
      }
      // console.log(getState().auth)
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRootCats: builder.query({
      query: () => ({
        document: `query {
                    CategoryFind(query: "[{\\"parent\\": null}]"){
                           _id name image{url}
                                }
                            }`,
      }),
    }),
    login: builder.mutation({
      query: ({ login, password }) => ({
        document: ` query login($login: String, $password: String) {
                        login(login: $login, password: $password) 
                    }
                    `,
        variables: { login, password },
      }),
    }),
    getCategoryById: builder.query({
      query: ({ _id }) => ({
        document: `query oneCat($query: String){
                    CategoryFindOne(query:$query){
                        _id
                         name
                        subCategories{name _id}
                        goods{
                            _id name price images{
                                url
                            }
                        }
                    }
                }
                `,
        variables: { query: JSON.stringify([{ _id }]) },
      }),
    }),
    getGoodById: builder.query({
      query: ({ _id }) => ({
        document: `query good($q:String){
                     GoodFindOne(query:$q){
                            name
                            _id
                            price
                            description
                            images{
                            url _id
                        }
                      }
                    }`,
        variables: { q: JSON.stringify([{ _id }]) },
      }),
      providesTags: (result, error, { _id }) => {
        return [{ type: "Good", id: _id }];
      },
    }),

    getUserById: builder.query({
      query: ({ _id }) => ({
        //тут обов'язково має бути `_id`
        document: `query oneUser($query: String){
                    UserFindOne(query: $query){
                        _id login nick avatar{ url }
                    }
                }`,
        variables: { query: JSON.stringify([{ _id }]) },
      }),
      providesTags: (result, error, { _id }) => {
        //функція, яка створює тег, який ідентіфікує користувача
        return [{ type: "User", id: _id }];
      },
    }),
    register: builder.mutation({
      query: ({ login, password, nick }) => ({
        document: `mutation register($login:String, $password: String, $nick:String){
    UserUpsert(user: {login:$login, password: $password, nick : $nick}){
        _id login createdAt  nick
    }
}`,
        variables: { login, password, nick },
      }),
    }),
    getAllOrders: builder.query({
      query: (skip) => ({
        document: ` query allOrders($query:String){
             OrderFind(query:$query){
                      _id
                      createdAt
                      total
                      owner{login} 
                      
                        }
                      }`,
        variables: {
          query: JSON.stringify([
            {},
            { sort: [{ _id: -1 }], skip: [skip], limit: [100] },
          ]),
        },
      }),
    }),
    getOrderById: builder.query({
      query: ({ _id }) => ({
        document: ` query orderOne($query:String){
                 OrderFindOne(query:$query) {
                    _id
                    createdAt
                    owner{login}
                    total
                    orderGoods {goodName count  price}
                    }
                }`,
        variables: { query: JSON.stringify([{ _id }]) },
      }),
    }),
    getUserHistory: builder.query({
      query: () => ({
        document: `query orders{
      OrderFind(query:"[{},{\\"sort\\":[{\\"_id\\":-1}]}]"){
      total createdAt orderGoods{      
      good{_id name images{url} }
      price
      count
      total
  }}}`,
      }),
    }),
    newOrder: builder.mutation({
      query: ({ order }) => ({
        document: `mutation newOrder($order:OrderInput){
        OrderUpsert(order:$order){_id}}`,
        variables: { order },
      }),
    }),
    getAllGoods: builder.query({
      query: () => ({
        document: `query allGoods{
              GoodFind(query:"[{}]"){
                _id name
                categories{name _id}
                price
              }
            }`,
      }),
    }),
    goodsSearch: builder.query({
      query: (search) => ({
        document: `query goodsSearch($query:String){
               GoodFind(query:$query){
                name
                price
                 _id
                images{url}

               }
        }`,
        variables: {
          query: JSON.stringify([
            { $or: [{ name: `/${search}/` }, { description: `/${search}/` }] },
            { sort: [{ name: 1 }] },
          ]),
        },
      }),
    }),
    upsertGood: builder.mutation({
      query: ({ good }) => ({
        document: `mutation upsertGood($good:GoodInput){
              GoodUpsert(good:$good){
                  _id
              }
          }`,

        variables: {
          good: { ...good, images: good.images.map(({ _id }) => ({ _id })) },
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Good", id: arg.good._id },
      ],
    }),
    getAllCats: builder.query({
      query: () => ({
        document: `query allCategories{
              CategoryFind(query:"[{}]"){
                  _id name  parent{_id}
                  }
                }`,
      }),
    }),
  }),
});

const jwtDecode = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, payload: null, error: null },
  reducers: {
    login(state, { payload: token }) {
      //другий параметр - об'єкт екшона, token потрапляє в ключ payload
      // console.log('LOGIN', state, token)
      const payload = jwtDecode(token);
      if (payload) {
        state.payload = payload;
        state.token = token;
      }
    },
    logout(state) {
      state.payload = null;
      state.token = null;
    },
    setAuthError(state, { payload: error }) {
      state.error = error;
    },
  },
});

export const store = configureStore({
  reducer: {
    [authSlice.name]: persistReducer(
      { key: "auth", storage },
      authSlice.reducer
    ),
    [cartSlice.name]: cartSlice.reducer,
    [feedSlice.name]: feedSlice.reducer,
    [api.reducerPath]: api.reducer, //підключення слайса, створеннного createApi
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    api.middleware,
  ], //додаємо мідлварь
});

console.log(api);

const persistor = persistStore(store);
