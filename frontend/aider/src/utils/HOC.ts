import React from "react";
import { Login } from "../containers/login";
import { getAuthToken, tokenName } from "./factory";


export const AuthHOC = (element: ()=>React.JSX.Element) => {
    const token = getAuthToken()
    return token ? element : Login;
  };