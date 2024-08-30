import { useParams, Link } from "react-router-dom";
import { api } from "../APIpages/api.js";
import { Card, Button, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

const { useGetAllGoodsQuery } = api;

const OneGoodAdmin = ({ good }) => {
  const { name, price, _id } = good;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          // flexDirection: "row",
          justifyContent: "space-between",
          //boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          boxShadow: shadows[10],
          width: "90%",
        }}
      >
        {/* <div className="order-description-admin"> */}
        <Typography variant="h6" color="text.secondary" width={"50%"}>
          {name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Ціна: {price} грн
        </Typography>
        <Button component={Link} to={`/admin/good/${_id}`}>
          Детальніше
        </Button>
        {/* </div> */}
      </Card>
    </>
  );
};

export const AdminGoods = () => {
  const { isLoading, data } = useGetAllGoodsQuery();

  if (isLoading) {
    return <h4>Loading...</h4>;
  }
  const { GoodFind } = data;
  return (
    <>
      <h3>Усі товари</h3>
      {data.GoodFind.map((good) => (
        <OneGoodAdmin good={good} />
      ))}
    </>
  );
};
