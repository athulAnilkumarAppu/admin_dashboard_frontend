"use client";

import { useContext, useState } from "react";

import { userContext } from "@/app/ContextApiWrapper";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();

  const { setNameOfUser } = useContext(userContext);

  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: any) => {
    setName(e.target.value);
  };

  const signInService = async () => {
    const params = { name: name, email: email, password: password };
    await axios
      .post("http://localhost:3000/signin", params)
      .then((response: any) => {
        if (response) {
          if (response.data.signinStatus === true) {
            setNameOfUser(response.data.name);
            alert(response.data.message);
            router.push("/");
          } else {
            alert(response.data.message);
          }
        }
      });
  };

  const onSubmitClick = () => {
    signInService();
  };

  return (
    <>
      <h2>Sign In</h2>

      <label>Name</label>
      <input type="text" value={name} onChange={(e: any) => onNameChange(e)} />

      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e: any) => onEmailChange(e)}
      />

      <label>password</label>
      <input
        type="text"
        value={password}
        onChange={(e: any) => onPasswordChange(e)}
      />

      <button onClick={() => onSubmitClick()}>Submit</button>
    </>
  );
};

export default Signin;
