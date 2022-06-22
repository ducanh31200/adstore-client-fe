import React, { useState } from "react";
import { Route, RouteProps, useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../helper/base.helpers";
import useAuth from "../store/auth";
import { notifyError } from "../utils/notify";
import { LoadingLMS } from "./common/Loading/loading";

interface IPrivateRoute extends RouteProps {
  option: boolean;
  roleRoute?: Array<string>;
}
export const PrivateRoute = (props: IPrivateRoute) => {
  const { option, roleRoute } = props;
  // console.log("asd", roleRoute);
  const navigate = useNavigate();
  const [, actionAuth] = useAuth();
  const [acceptRoute, setAcceptRoute] = useState(false);

  const fetchAuth = async () => {
    const token = getFromLocalStorage("accessToken");
    if (token) {
      const res = await actionAuth.getUserAsync();

      if (res && !res.data) {
        if (option) {
          navigate("/");
        }
      } else {
        //đã đăng nhập
        if (roleRoute && !roleRoute.includes(res.data.role)) {
          //Kiểm tra khong phai admin

          notifyError("Không có quyền truy cập !");
          navigate("/");
        } else {
          if (option === false) {
            notifyError("Không có quyền truy cập !");
            navigate("/");
          }
        }
      }
    } else {
      notifyError("Không có quyền truy cập !");
      navigate("/");
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
