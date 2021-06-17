import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <p className="tab" onClick={() => logout()}>
        Logout
      </p>
    )
  );
};

export default Logout;
