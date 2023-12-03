"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { LOGIN_URL } from "@/utils/serviceUrls";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const [loginStatusRes, setLoginStatusRes] = useState<boolean>(false);

  useEffect(() => {
    if (loginStatusRes) {
      router.push("/dashboard");
    }
  }, [loginStatusRes]);

  const onUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const loginService = async () => {
    const params = { username: username, password: password };
    await axios
      .post("http://localhost:3000/login", params)
      .then((response: any) => {
        if (response) {
          if (response.data.loginStatus === true) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            setLoginStatusRes(true);
          } else {
            setLoginStatusRes(false);
            alert(response.data.message);
            setUsername("");
            setPassword("");
          }
        }
      });
  };

  const onSubmitClick = () => {
    loginService();
  };

  const onSigninClick = () => {
    router.push("/signin");
  };

  return (
    <>
      <h2>Login</h2>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e: any) => onUsernameChange(e)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e: any) => onPasswordChange(e)}
      />

      <button onClick={() => onSubmitClick()}>Login</button>

      <span>New User</span>
      <button onClick={() => onSigninClick()}>SignIn</button>
    </>
  );
};

export default Login;
