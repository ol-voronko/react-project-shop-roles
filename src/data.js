export const good = {
  name: "Набір інструментів",
  _id: "62d3099ab74e1f5f2ec1a125",
  price: 500,
  description:
    " Инструменты изготовлены из закаленной углеродистой стали, грани твердые и не стираются при работе",
  categories: [
    {
      _id: "6262ca7dbf8b206433f5b3d1",
      createdAt: "1650641533000",
      name: "Tools",
    },
  ],
  images: [
    {
      url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
    },
    {
      url: "images/deb969d717fedd5edc6991961312451a",
    },
    {
      url: "images/8c2bfb28118a656c2111b56f89df29ee",
    },
  ],
};

export const category = {
  _id: "6262ca7dbf8b206433f5b3d1",
  name: "Tools",
  goods: [
    {
      _id: "62d3099ab74e1f5f2ec1a125",
      name: "Набір інструментів",
      price: 500,
      images: [
        {
          url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
        },
      ],
    },
    {
      _id: "62d30938b74e1f5f2ec1a124",
      name: "Набір інструментів",
      price: 1150,
      images: [
        {
          url: "images/deb969d717fedd5edc6991961312451a",
        },
        {
          url: "images/8c2bfb28118a656c2111b56f89df29ee",
        },
      ],
    },
    {
      _id: "62d40618b74e1f5f2ec1a12e",
      name: "Лобзик электрический JS08-100A",
      price: 780,
      images: [
        {
          url: "images/8b3047bce7fd16f3a4900cf81da113d0",
        },
      ],
    },
    {
      _id: "64031b15d5e3301cba63a55f",
      name: "Пила циркулярная Bosch Professional GKS 190",
      price: 6329,
      images: [
        {
          url: "images/824ac271ea638babf0fb0e54cda47541",
        },
      ],
    },
  ],
};

export const categories = [
  {
    name: "Tools",
    _id: "6262ca7dbf8b206433f5b3d1",
    image: {
      url: "images/5e64d5b9074b493cfffc11b6009ce11c",
    },
  },
  {
    name: "Smartphone",
    _id: "62c94b10b74e1f5f2ec1a0dd",
    image: {
      url: "images/72555f108db051bddb9a47e712bd655a",
    },
  },
  {
    name: "Garden",
    _id: "62ce891eb74e1f5f2ec1a0eb",
    image: {
      url: "images/fd2152bc128e67d52e2744927ee94935",
    },
  },
  {
    name: "Children's products",
    _id: "62ce8a8fb74e1f5f2ec1a0ec",
    image: {
      url: "images/107f715f3dbae9202c0723e0b7f2be21",
    },
  },
  {
    name: "Hobbies and sports",
    _id: "62ce8b3db74e1f5f2ec1a0ed",
    image: {
      url: "images/24edb57cc18fa16e55d108d1eeb2cf69",
    },
  },
  {
    name: "Sale",
    _id: "62d40377b74e1f5f2ec1a129",
    image: {
      url: "images/186045b20b404a696a5b8cd89232ff02",
    },
  },
  {
    name: "TestCats",
    _id: "63da9bfdd5e3301cba63a2a7",
    image: {
      url: null,
    },
  },
  {
    name: "Laptops",
    _id: "63dd6537d5e3301cba63a345",
    image: {
      url: "images/5a6d02827831819b09f7e8df1b5887fb",
    },
  },
  {
    name: "Food",
    _id: "64031651d5e3301cba63a54c",
    image: {
      url: "images/2e91a7fc312c7cf65d4f4030c6e21219",
    },
  },
  {
    name: "Drinks",
    _id: "64031693d5e3301cba63a54d",
    image: {
      url: "images/5dd6aba3794570a2629be794290a14b1",
    },
  },
  {
    name: "Books",
    _id: "641772f4cf9ab52a4f5a660d",
    image: {
      url: "images/0e3d39b6cf8159c94f8afaa07ab48167",
    },
  },
  {
    name: "Pets stuff",
    _id: "64187ea8cf9ab52a4f5a660e",
    image: null,
  },
  {
    name: "Furniture",
    _id: "64187ef8cf9ab52a4f5a660f",
    image: null,
  },
  {
    name: "Cherepashki",
    _id: "64b7f9496ad1742358aefe34",
    image: null,
  },
  {
    name: "Snow133",
    _id: "64b7fe1b6ad1742358aefe3a",
    image: null,
  },
  {
    name: "testNew",
    _id: "64edf6886ad1742358af00cb",
    image: null,
  },
  {
    name: "Rb in root",
    _id: "6571df952232120c7c871bd2",
    image: null,
  },
];

export const orders = [
  {
    total: 9798,
    createdAt: "1720260452000",
    orderGoods: [
      {
        good: {
          _id: "62c94990b74e1f5f2ec1a0db",
          name: "Samsung Galaxy M52",
          images: [
            {
              url: "images/e91a37b88f947e51586dfe87b2f4e13f",
            },
            {
              url: "images/bf8fcf557844ba9bce1368e5bf52bb4d",
            },
            {
              url: "images/fd419e96ffc2d21e880fc0efabe7ae5c",
            },
          ],
        },
        price: 4899,
        count: 2,
        total: 9798,
      },
    ],
  },
  {
    total: 2800,
    createdAt: "1721237706000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 1,
        total: 500,
      },
      {
        good: {
          _id: "62d30938b74e1f5f2ec1a124",
          name: "Набір інструментів",
          images: [
            {
              url: "images/deb969d717fedd5edc6991961312451a",
            },
            {
              url: "images/8c2bfb28118a656c2111b56f89df29ee",
            },
          ],
        },
        price: 1150,
        count: 2,
        total: 2300,
      },
    ],
  },
  {
    total: 1100,
    createdAt: "1721238373000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 1,
        total: 500,
      },
      {
        good: {
          _id: "62cf2979b74e1f5f2ec1a0ef",
          name: "Настільний футбол LIMO TOY 2035N",
          images: [
            {
              url: "images/7fba6d8d146de0b5c8569a6e4ff3a89f",
            },
          ],
        },
        price: 600,
        count: 1,
        total: 600,
      },
    ],
  },
  {
    total: 105,
    createdAt: "1721240189000",
    orderGoods: [
      {
        good: {
          _id: "6403186bd5e3301cba63a555",
          name: "Свинина тушеная Вербена 525 г",
          images: [
            {
              url: "images/6e91eaba92e20069199d11ac288b7042",
            },
          ],
        },
        price: 105,
        count: 1,
        total: 105,
      },
    ],
  },
  {
    total: 2500,
    createdAt: "1721241806000",
    orderGoods: [
      {
        good: {
          _id: "62d57ab8b74e1f5f2ec1a148",
          name: "Motorola Razr 5G 8/256GB Graphite",
          images: [
            {
              url: "images/aa79481b72ce8f9375450f3bf6693b77",
            },
          ],
        },
        price: 2500,
        count: 1,
        total: 2500,
      },
    ],
  },
  {
    total: 1315,
    createdAt: "1721395721000",
    orderGoods: [
      {
        good: {
          _id: "62d30938b74e1f5f2ec1a124",
          name: "Набір інструментів",
          images: [
            {
              url: "images/deb969d717fedd5edc6991961312451a",
            },
            {
              url: "images/8c2bfb28118a656c2111b56f89df29ee",
            },
          ],
        },
        price: 1150,
        count: 1,
        total: 1150,
      },
      {
        good: {
          _id: "6408bfead5e3301cba63a5ab",
          name: "Секатор садовый Intertool 200 мм",
          images: [
            {
              url: "images/1bb7e880d36f7bb0d7362ebb43c38eae",
            },
          ],
        },
        price: 165,
        count: 1,
        total: 165,
      },
    ],
  },
  {
    total: 500,
    createdAt: "1721396073000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 1,
        total: 500,
      },
    ],
  },
  {
    total: 540,
    createdAt: "1721396318000",
    orderGoods: [
      {
        good: {
          _id: "6400fe68d5e3301cba63a530",
          name: "Набор кистевых эспандеров Newt Power Grip",
          images: [
            {
              url: "images/a0da1463d8d4096d209a9553c818f4de",
            },
          ],
        },
        price: 120,
        count: 1,
        total: 120,
      },
      {
        good: {
          _id: "6400edd9d5e3301cba63a52a",
          name: "Мяч гимнастический PowerPlay 4001 Silver 75 см + насос",
          images: [
            {
              url: "images/26a3e8b54ddd733ad0be575090eb7186",
            },
          ],
        },
        price: 420,
        count: 1,
        total: 420,
      },
    ],
  },
  {
    total: 1002,
    createdAt: "1721758013000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
      {
        good: {
          _id: "6401064fd5e3301cba63a54b",
          name: "one crying cat meme",
          images: [
            {
              url: "images/d9887c601f505a24811c3d3a880233f7",
            },
          ],
        },
        price: 1,
        count: 2,
        total: 2,
      },
    ],
  },
  {
    total: 330,
    createdAt: "1721758073000",
    orderGoods: [
      {
        good: {
          _id: "6408bfead5e3301cba63a5ab",
          name: "Секатор садовый Intertool 200 мм",
          images: [
            {
              url: "images/1bb7e880d36f7bb0d7362ebb43c38eae",
            },
          ],
        },
        price: 165,
        count: 2,
        total: 330,
      },
    ],
  },
  {
    total: 1000,
    createdAt: "1721758239000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
    ],
  },
  {
    total: 1000,
    createdAt: "1721758582000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
    ],
  },
  {
    total: 1000,
    createdAt: "1721758769000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
    ],
  },
  {
    total: 6560,
    createdAt: "1721837656000",
    orderGoods: [
      {
        good: {
          _id: "62d57ab8b74e1f5f2ec1a148",
          name: "Motorola Razr 5G 8/256GB Graphite",
          images: [
            {
              url: "images/aa79481b72ce8f9375450f3bf6693b77",
            },
          ],
        },
        price: 2500,
        count: 2,
        total: 5000,
      },
      {
        good: {
          _id: "62d40618b74e1f5f2ec1a12e",
          name: "Лобзик электрический JS08-100A",
          images: [
            {
              url: "images/8b3047bce7fd16f3a4900cf81da113d0",
            },
          ],
        },
        price: 780,
        count: 2,
        total: 1560,
      },
    ],
  },
  {
    total: 1000,
    createdAt: "1721837864000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
    ],
  },
  {
    total: 3000,
    createdAt: "1721837916000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 1,
        total: 500,
      },
      {
        good: {
          _id: "62d403fbb74e1f5f2ec1a12a",
          name: "Виски Glengoyne 50yo 0,725 л",
          images: [
            {
              url: "images/320ccb30bf635d717dbc150ed8e39f01",
            },
          ],
        },
        price: 1250,
        count: 2,
        total: 2500,
      },
    ],
  },
  {
    total: 14118,
    createdAt: "1721838331000",
    orderGoods: [
      {
        good: {
          _id: "64031b15d5e3301cba63a55f",
          name: "Пила циркулярная Bosch Professional GKS 190",
          images: [
            {
              url: "images/824ac271ea638babf0fb0e54cda47541",
            },
          ],
        },
        price: 6329,
        count: 2,
        total: 12658,
      },
      {
        good: {
          _id: "6408bfead5e3301cba63a5ab",
          name: "Секатор садовый Intertool 200 мм",
          images: [
            {
              url: "images/1bb7e880d36f7bb0d7362ebb43c38eae",
            },
          ],
        },
        price: 165,
        count: 2,
        total: 330,
      },
      {
        good: {
          _id: "6408bf99d5e3301cba63a5aa",
          name: "Ороситель Verto регулированный 16 отверстий до 336 м²",
          images: [
            {
              url: "images/e0c3b8e8dea353c5deeac2d9e2a0c4bd",
            },
          ],
        },
        price: 565,
        count: 2,
        total: 1130,
      },
    ],
  },
  {
    total: 13298,
    createdAt: "1721838727000",
    orderGoods: [
      {
        good: {
          _id: "63dd65d4d5e3301cba63a349",
          name: "HP ProBook 450",
          images: [
            {
              url: "images/d59e9033fa9ab5407ef941d2a3fcb03f",
            },
            {
              url: "images/aa92b3ce6a8a4c3e7f9a2897396c9098",
            },
            {
              url: "images/c9882f1fadb32066732fe46079f2f3a8",
            },
          ],
        },
        price: 13298,
        count: 1,
        total: 13298,
      },
    ],
  },
  {
    total: 600,
    createdAt: "1721838779000",
    orderGoods: [
      {
        good: {
          _id: "62cf2979b74e1f5f2ec1a0ef",
          name: "Настільний футбол LIMO TOY 2035N",
          images: [
            {
              url: "images/7fba6d8d146de0b5c8569a6e4ff3a89f",
            },
          ],
        },
        price: 600,
        count: 1,
        total: 600,
      },
    ],
  },
  {
    total: 2500,
    createdAt: "1721838985000",
    orderGoods: [
      {
        good: {
          _id: "62d403fbb74e1f5f2ec1a12a",
          name: "Виски Glengoyne 50yo 0,725 л",
          images: [
            {
              url: "images/320ccb30bf635d717dbc150ed8e39f01",
            },
          ],
        },
        price: 1250,
        count: 2,
        total: 2500,
      },
    ],
  },
  {
    total: 29999,
    createdAt: "1721839150000",
    orderGoods: [
      {
        good: {
          _id: "63dd66f9d5e3301cba63a354",
          name: "MacBook Air M1 chip",
          images: [
            {
              url: "images/f4958ad7c04c8096c5af2a9823b4f473",
            },
            {
              url: "images/dbc7cc4bd34c9bce10bfcf613c84e12d",
            },
          ],
        },
        price: 29999,
        count: 1,
        total: 29999,
      },
    ],
  },
  {
    total: 565,
    createdAt: "1721920934000",
    orderGoods: [
      {
        good: {
          _id: "6408bf99d5e3301cba63a5aa",
          name: "Ороситель Verto регулированный 16 отверстий до 336 м²",
          images: [
            {
              url: "images/e0c3b8e8dea353c5deeac2d9e2a0c4bd",
            },
          ],
        },
        price: 565,
        count: 1,
        total: 565,
      },
    ],
  },
  {
    total: 3100,
    createdAt: "1721921076000",
    orderGoods: [
      {
        good: {
          _id: "62d57ab8b74e1f5f2ec1a148",
          name: "Motorola Razr 5G 8/256GB Graphite",
          images: [
            {
              url: "images/aa79481b72ce8f9375450f3bf6693b77",
            },
          ],
        },
        price: 2500,
        count: 1,
        total: 2500,
      },
      {
        good: {
          _id: "62cf2979b74e1f5f2ec1a0ef",
          name: "Настільний футбол LIMO TOY 2035N",
          images: [
            {
              url: "images/7fba6d8d146de0b5c8569a6e4ff3a89f",
            },
          ],
        },
        price: 600,
        count: 1,
        total: 600,
      },
    ],
  },
  {
    total: 565,
    createdAt: "1721982477000",
    orderGoods: [
      {
        good: {
          _id: "6408bf99d5e3301cba63a5aa",
          name: "Ороситель Verto регулированный 16 отверстий до 336 м²",
          images: [
            {
              url: "images/e0c3b8e8dea353c5deeac2d9e2a0c4bd",
            },
          ],
        },
        price: 565,
        count: 1,
        total: 565,
      },
    ],
  },
  {
    total: 1000,
    createdAt: "1721994916000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 2,
        total: 1000,
      },
    ],
  },
  {
    total: 1650,
    createdAt: "1723990891000",
    orderGoods: [
      {
        good: {
          _id: "62d3099ab74e1f5f2ec1a125",
          name: "Набір інструментів",
          images: [
            {
              url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
            },
          ],
        },
        price: 500,
        count: 1,
        total: 500,
      },
      {
        good: {
          _id: "62d30938b74e1f5f2ec1a124",
          name: "Набір інструментів",
          images: [
            {
              url: "images/deb969d717fedd5edc6991961312451a",
            },
            {
              url: "images/8c2bfb28118a656c2111b56f89df29ee",
            },
          ],
        },
        price: 1150,
        count: 1,
        total: 1150,
      },
    ],
  },
];
export const cart = {
  21: {
    count: 1,
    good: {
      images: [
        {
          url: "images/deb969d717fedd5edc6991961312451a",
        },
        { url: "images/8c2bfb28118a656c2111b56f89df29ee" },
      ],
      name: "Набір інструментів",
      price: 1150,
      _id: "62d30938b74e1f5f2ec1a124",
    },
  },
  54: {
    count: 3,
    good: {
      _id: "62d3099ab74e1f5f2ec1a125",
      name: "Набір інструментів",
      price: 500,
      images: [
        {
          url: "images/0ef8b29b1992ffdc6dfb7d3a9974267a",
        },
      ],
    },
  },
};
export const order = {
  _id: "66c355d9e866766ddd7c6810",
  createdAt: "1724077529000",
  owner: {
    login: "admin",
  },
  total: 1065,
  orderGoods: [
    {
      goodName: "Набір інструментів",
      count: 2,
      price: 500,
    },
    {
      goodName: "Ороситель Verto регулированный 16 отверстий до 336 м²",
      count: 1,
      price: 565,
    },
  ],
};
