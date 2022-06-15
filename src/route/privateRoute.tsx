import React, { Component, useState } from "react";

import { Route } from "react-router-dom";
import { LoadingLMS } from "../Components/common/Loading/loading";
import { getFromLocalStorage } from "../helper/base.helpers";
import useAuth from "../store/auth";

export const PrivateRoute = (props: { children: React.ReactElement }) => {
  // const { roleRoute } = props;
  const [, actionAuth] = useAuth();
  // console.log("asd", roleRoute);

  // const user = useSelector(selectCurrentUser);
  const [acceptRoute, setAcceptRoute] = useState(false);

  const fetchAuth = async () => {
    const token = getFromLocalStorage("accessToken");
    if (!token) {
    } else {
      const res = await actionAuth.getUserAsync();
    }
    setAcceptRoute(true);
  };

  React.useEffect(() => {
    fetchAuth();
    //To know my current status, send Auth request
  }, []);

  // const isLoggedIn = localStorage.getItem('token')
  // if (!isLoggedIn) return <Redirect to='/' />
  if (acceptRoute) return <React.Fragment>{props.children}</React.Fragment>;
  return <LoadingLMS loading={true} />;
};
