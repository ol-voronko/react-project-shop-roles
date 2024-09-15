import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Route, useParams } from "react-router-dom";
import { OneFullOrderAdmin, Order } from "./Order.js";
import { Orders } from "./Orders.js";
import { AdminGoods } from "./AdminGoods.js";
import { OneGoodAdminPage } from "./OneGoodAdminPage.js";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { CategoryTree } from "../categoryTree/CategoryTree.js";
import { AdminSearch } from "./AdminSearch.js";
import { AddCatAdmin } from "../categoryTree/AddCatAdmin.js";
import { UpsertGood } from "./EditGoodAdmin.js";

const drawerWidth = "20vw";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: "5%",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const AdminPage = (props) => {
  // const { _id } = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const asideSettings = [
    { title: "Усі замовлення", url: "/orders" },
    { title: "Усі категорії", url: "/categories" },
    { title: "Усі товари", url: "/goods" },
    { title: "Головна", url: "/" },
  ];
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const DrawerAside = () => {
    const [inputSearch, setInputSearch] = useState("");
    const handleChangeInputSearch = (e) => {
      setInputSearch(e.target.value);
    };

    const search = (value) => {
      let mode = value.split(/\s+/).join("|");
      return mode;
    };
    return (
      <div>
        <Toolbar />
        <Divider />
        <List>
          {asideSettings.map((text, index) => (
            <ListItem key={text.title} disablePadding>
              <ListItemButton
                component={Link}
                to={text.title === "Головна" ? text.url : "/admin" + text.url}
              >
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Search
          sx={{
            display: "flex",
            border: "1px solid #42a5f5",
          }}
        >
          <Typography
            component={Link}
            to={`/admin/goods/${search(inputSearch)}`}
          >
            <SearchIcon />
          </Typography>

          <StyledInputBase
            placeholder="Пошук..."
            inputProps={{
              "aria-label": "search",
            }}
            value={inputSearch}
            onChange={handleChangeInputSearch}
            // onKeyPress={(e) => {
            //   if (e.key === "Enter") {
            //     handleSearch();
            //   }
            //
          />
        </Search>
      </div>
    );
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", overflowX: "hidden" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100vw- ${drawerWidth})` },
          //   ml: { sm: "10vw" },
          //   ml: { sm: { drawerWidth } },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ marginLeft: "15vw" }}>
            Admin dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerAside />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerAside />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: "80vw",
        }}
      >
        <Toolbar />
        <Route exact path="/admin/goods" component={AdminGoods} />
        <Route path="/admin/good/:_id" component={OneGoodAdminPage} />
        <Route path="/admin/goods/:search" component={AdminSearch} />
        <Route path="/admin/orders" component={Orders} />
        <Route exact path="/admin/order/:_id" component={OneFullOrderAdmin} />
        <Route path="/admin/categories" component={CategoryTree} />
        {/* <Route path="/admin/addGood" component={AddGoodAdmin} /> */}
        <Route path="/admin/addGood" component={UpsertGood} />
        <Route path="/admin/addCat" component={AddCatAdmin} />
      </Box>
    </Box>
  );
};
