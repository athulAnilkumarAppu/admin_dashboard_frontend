"use client";

import { useEffect, useState } from "react";

import axios from "axios";

const EditUser = () => {
  const token = localStorage.getItem("token");

  const [usersListData, setUsersListData] = useState<any>([]);
  const [editClicked, setEditClicked] = useState<any>({
    editClicked: false,
    editId: "",
  });
  const [userDataUpdated, setUserDataUpdated] = useState<boolean>(false);

  const [editNameValue, setEditNameValue] = useState<string>("");
  const [editEmailValue, setEditEmailValue] = useState<string>("");
  const [editPasswordValue, setEditPasswordValue] = useState<string>("");

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
          setUsersListData(response.data.allUsers);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      })
      .finally(() => {
        setUserDataUpdated(false);
      });
  }, [userDataUpdated]);

  const updateUserService = async (userId: any) => {
    return await axios
      .post(
        "http://localhost:3000/editUser/updateUser",
        {
          updatedName: editNameValue,
          updatedEmail: editEmailValue,
          updatedPassword: editPasswordValue,
          updatedUserId: userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setUserDataUpdated(true);
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      });
  };

  const deleteUserService = async (userId: any) => {
    return await axios
      .post(
        "http://localhost:3000/editUser/deleteUser",
        {
          deleteUserId: userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setUserDataUpdated(true);
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      });
  };

  const onEditClick = (item: any) => {
    setEditClicked({ editClicked: !editClicked.editClicked, editId: item._id });
    setEditNameValue(item.name);
    setEditEmailValue(item.email);
    setEditPasswordValue(item.password);
  };

  const onDeleteClick = (item: any) => {
    const deleteconfirm = window.confirm(
      "Are you sure want to delete this user"
    );
    if (deleteconfirm) {
      deleteUserService(item._id);
    }
  };

  const onUpdateClick = (item: any) => {
    updateUserService(item._id);
  };

  const onUserDetailsChange = (e: any) => {
    switch (e.target.id) {
      case "name":
        setEditNameValue(e.target.value);
        break;
      case "email":
        setEditEmailValue(e.target.value);
        break;
      case "password":
        setEditPasswordValue(e.target.value);
        break;
      default:
        null;
    }
  };

  return (
    <>
      <ul>
        {usersListData?.length > 0 &&
          usersListData.map((item: any) => {
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                {editClicked.editClicked && item._id === editClicked.editId ? (
                  <>
                    <input
                      type="text"
                      value={editNameValue}
                      placeholder="Name"
                      id="name"
                      onChange={(e: any) => onUserDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmailValue}
                      placeholder="Email"
                      id="email"
                      onChange={(e: any) => onUserDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editPasswordValue}
                      placeholder="password"
                      id="password"
                      onChange={(e: any) => onUserDetailsChange(e)}
                    />
                  </>
                ) : (
                  <li>{item.name}</li>
                )}
                <button onClick={() => onEditClick(item)}>
                  {editClicked.editClicked && item._id === editClicked.editId
                    ? "Cancel"
                    : "Edit"}
                </button>
                {editClicked.editClicked && item._id === editClicked.editId && (
                  <button onClick={() => onUpdateClick(item)}>Update</button>
                )}

                <button onClick={() => onDeleteClick(item)}>Delete</button>
              </div>
            );
          })}
      </ul>
    </>
  );
};

export default EditUser;
