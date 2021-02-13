import React from "react";
import AuthContext from "@Context/AuthContext";
import useProvideAuth from "@Hooks/useProvideAuth";

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default ProvideAuth;
