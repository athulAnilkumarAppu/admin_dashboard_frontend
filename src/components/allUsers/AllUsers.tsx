"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const token = localStorage.getItem("token");

  const [usersList, setUsersList] = useState<any>([]);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/allusers",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setUsersList(response.data.allUsers);
        } else {
          alert(response.data.message);
        }
      });
  }, []);
  return (
    <>
      <ul>
        {usersList?.length > 0 &&
          usersList.map((item: any) => {
            return <li>{item.name}</li>;
          })}
      </ul>
    </>
  );
};

export default AllUsers;
