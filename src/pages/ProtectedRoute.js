import { useSelector } from "react-redux";
import { selectAuthToken, selectUserRole } from "../APIpages/selectors";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export const ProtectedRoute = ({
  component: Component,
  user,
  fallback,
  ...rest
}) => {
  const userRole = useSelector(selectUserRole);

  return (
    <Route
      {...rest}
      component={(props) => {
        if (user.includes(userRole)) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={fallback} />;
        }
      }}
    />
  );
};
