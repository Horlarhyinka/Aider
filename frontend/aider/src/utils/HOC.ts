import React from "react";
import { Login } from "../containers/login";
import { tokenName } from "./factory";

interface Prop{
    element: React.JSX.Element
}

export const AuthHOC: React.FC<Prop> = ({ element }) => {
    const token = window.localStorage.getItem(tokenName);
  
    return token ? element : Login as any;
  };