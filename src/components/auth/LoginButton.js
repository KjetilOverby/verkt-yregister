import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

const LoginButton = ({ from }) => {
  const router = useRouter();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const loginHandler = () => {
    loginWithRedirect();
  };
  return (
    !isAuthenticated && (
      <p className="button" onClick={loginHandler}>
        Login
      </p>
    )
  );
};

export default LoginButton;
