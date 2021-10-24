import React from "react";

import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { signInwithGoogle } = useAuth();

  return <button onClick={signInwithGoogle}>Login</button>;
};

export default Login;
