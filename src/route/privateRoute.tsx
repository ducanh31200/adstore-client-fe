import React, { useState } from "react";

import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import { LoadingLMS } from "../Components/common/Loading/loading";
import { getFromLocalStorage } from "../helper/base.helpers";
import useAuth from "../store/auth";

interface IPrivateRoute extends RouteProps {
  roleRoute?: Array<number>;
}
export const PrivateRoute = (props: IPrivateRoute) => {
  // const { roleRoute } = props;
  const [stateAuth, actionAuth] = useAuth();
  // console.log("asd", roleRoute);
  const history = useHistory();

  // const user = useSelector(selectCurrentUser);
  const [acceptRoute, setAcceptRoute] = useState(false);

  const fetchAuth = async () => {
    const token = getFromLocalStorage("accessToken");
    console.log("token", token);
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
  if (acceptRoute) return <Route {...props} />;
  return <LoadingLMS loading={true} />;
};
