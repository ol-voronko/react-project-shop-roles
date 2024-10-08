import { Link } from "react-router-dom";
import { api } from "../../APIpages/api";
import { Card, Button, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

const { useGetAllGoodsQuery } = api;

export const CardOneGoodAdmin = ({ good }) => {
  const { name, price, _id } = good;
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mt: 2,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          //boxShadow: " 0px 0px 10px 10px rgb(241, 237, 237)",
          boxShadow: shadows[10],
          width: "90%",
        }}
      >
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

  return (
    <div className="orders-admin">
      <Typography variant="h4">Усі товари</Typography>
      <Button
        component={Link}
        to="/admin/addGood"
        variant="outlined"
        sx={{ mt: 3, mb: 2, alignSelf: "flex-start", boxShadow: shadows[2] }}
      >
        Додати товар
      </Button>
      {data.GoodFind.map((good) => (
        <CardOneGoodAdmin good={good} />
      ))}
    </div>
  );
};
