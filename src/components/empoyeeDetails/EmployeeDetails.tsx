"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { fileToBase64 } from "@/utils/utils";

const EmployeeDetails = () => {
  const token = localStorage.getItem("token");

  const [employeeListData, setEmployeeListData] = useState<any>([]);
  const [editClicked, setEditClicked] = useState<any>({
    editClicked: false,
    editId: "",
  });
  const [employeeDataUpdated, setemployeeDataUpdated] =
    useState<boolean>(false);

  const [editEmployeeNameValue, setEditEmployeeNameValue] =
    useState<string>("");
  const [editEmployeeAddressValue, setEditEmployeeAddressValue] =
    useState<string>("");
  const [editEmployeeAgeValue, setEditEmployeeAgeValue] = useState<string>("");
  const [editEmployeePhoneValue, setEditEmployeePhoneValue] =
    useState<string>("");
  const [editEmployeeDesignationValue, setEditEmployeeDesignationValue] =
    useState<string>("");
  const [editEmployeeCompanyNameValue, setEditEmployeeCompanyNameValue] =
    useState<string>("");
  const [editEmployeePhotoValue, setEditEmployeePhotoValue] = useState<any>("");

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/allEmployees",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setEmployeeListData(response.data.allEmployees);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      })
      .finally(() => {
        setemployeeDataUpdated(false);
      });
  }, [employeeDataUpdated]);

  const updateUserService = async (employeeId: any) => {
    return await axios
      .post(
        "http://localhost:3000/allEmployees/updateEmployee",
        {
          updatedEmployeeName: editEmployeeNameValue,
          updatedEmployeeAddress: editEmployeeAddressValue,
          updatedEmployeeAge: editEmployeeAgeValue,
          updatedEmployeePhone: editEmployeePhoneValue,
          updatedEmployeeDesination: editEmployeeDesignationValue,
          updatedEmployeeCompanyName: editEmployeeCompanyNameValue,
          updatedEmployeeImage: editEmployeePhotoValue,
          updatedEmployeeId: employeeId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setemployeeDataUpdated(true);
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      });
  };

  const deleteUserService = async (employeeId: any) => {
    return await axios
      .post(
        "http://localhost:3000/allEmployees/deleteEmployee",
        {
          deleteEmployeeId: employeeId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setemployeeDataUpdated(true);
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      });
  };

  const onEditClick = (item: any) => {
    setEditClicked({ editClicked: !editClicked.editClicked, editId: item._id });
    setEditEmployeeNameValue(item.employeeName);
    setEditEmployeeAddressValue(item.employeeAddress);
    setEditEmployeeAddressValue(item.employeeAddress);
    setEditEmployeeAgeValue(item.employeeAge);
    setEditEmployeePhoneValue(item.employeePhone);
    setEditEmployeeDesignationValue(item.employeeDesignation);
    setEditEmployeeCompanyNameValue(item.employeeCompanyName);
    setEditEmployeePhotoValue(item.employeeImage);
  };

  const onDeleteClick = (item: any) => {
    const deleteconfirm = window.confirm(
      "Are you sure want to delete this employee"
    );
    if (deleteconfirm) {
      deleteUserService(item._id);
    }
  };

  const onUpdateClick = (item: any) => {
    updateUserService(item._id);
  };

  const onEmployeeDetailsChange = async (e: any) => {
    switch (e.target.id) {
      case "employeeName":
        setEditEmployeeNameValue(e.target.value);
        break;
      case "address":
        setEditEmployeeAddressValue(e.target.value);
        break;
      case "age":
        setEditEmployeeAgeValue(e.target.value);
        break;
      case "phone":
        setEditEmployeePhoneValue(e.target.value);
        break;
      case "designation":
        setEditEmployeeDesignationValue(e.target.value);
        break;
      case "companyName":
        setEditEmployeeCompanyNameValue(e.target.value);
        break;
      case "profileImage":
        const file = e.target.files?.[0];
        if (file) {
          const base64Image = await fileToBase64(file);
          setEditEmployeePhotoValue(base64Image);
        }
        break;
      default:
        null;
    }
  };

  return (
    <>
      <h1>Employee List</h1>
      <ul>
        {employeeListData?.length > 0 &&
          employeeListData.map((item: any) => {
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                {editClicked.editClicked && item._id === editClicked.editId ? (
                  <>
                    <input
                      type="text"
                      value={editEmployeeNameValue}
                      placeholder="Employee Name"
                      id="employeeName"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmployeeAddressValue}
                      placeholder="Address"
                      id="address"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmployeeAgeValue}
                      placeholder="Age"
                      id="age"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmployeePhoneValue}
                      placeholder="phone"
                      id="phone"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmployeeDesignationValue}
                      placeholder="Designation"
                      id="designation"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="text"
                      value={editEmployeeCompanyNameValue}
                      placeholder="Company name"
                      id="companyName"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                    <input
                      type="file"
                      placeholder="Profile Image"
                      id="profileImage"
                      onChange={(e: any) => onEmployeeDetailsChange(e)}
                    />
                  </>
                ) : (
                  <>
                    <li>
                      <img
                        src={item.employeeImage}
                        alt="profileImg"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </li>
                    <li>{item.employeeName}</li>
                  </>
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

export default EmployeeDetails;
