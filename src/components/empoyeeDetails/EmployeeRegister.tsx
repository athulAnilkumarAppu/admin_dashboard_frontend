"use client";

import { useState } from "react";

import axios from "axios";
import { fileToBase64 } from "@/utils/utils";

const EmployeeRegister = () => {
  const token = localStorage.getItem("token");

  const [employeeName, setEmployeeName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [employeePhoto, setEmployeePhoto] = useState<any>("");

  const addEmployeeService = async () => {
    // const employeeImageBase64 = await fileToBase64(employeePhoto);
    return await axios
      .post(
        "http://localhost:3000/allEmployees/addEmployee",
        {
          employeeName: employeeName,
          employeeAddress: address,
          employeeAge: age,
          employeePhone: phone,
          employeeDesignation: designation,
          employeeCompanyName: companyName,
          employeeImage: employeePhoto,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          alert(response.data.message);
        }
      })
      .catch((error: any) => {
        alert("something went wrong");
      });
  };

  const onEmployeeNameChange = (e: any) => {
    setEmployeeName(e.target.value);
  };

  const onEmployeeAddressChange = (e: any) => {
    setAddress(e.target.value);
  };

  const onEmployeeAgeChange = (e: any) => {
    setAge(e.target.value);
  };

  const onEmployeePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const onEmployeeDesignationChange = (e: any) => {
    setDesignation(e.target.value);
  };

  const onEmployeeCompanyChange = (e: any) => {
    setCompanyName(e.target.value);
  };

  const onEmployeePhotoChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64Image = await fileToBase64(file);
      setEmployeePhoto(base64Image);
    }
  };

  const onSubmitClick = () => {
    addEmployeeService();
  };

  return (
    <>
      <h1>Register employee</h1>
      <label>Employee name</label>
      <input
        type="text"
        value={employeeName}
        onChange={(e: any) => onEmployeeNameChange(e)}
      />

      <label>Address</label>
      <input
        type="text"
        value={address}
        onChange={(e: any) => onEmployeeAddressChange(e)}
      />

      <label>Age</label>
      <input
        type="text"
        value={age}
        onChange={(e: any) => onEmployeeAgeChange(e)}
      />

      <label>Phone</label>
      <input
        type="text"
        value={phone}
        onChange={(e: any) => onEmployeePhoneChange(e)}
      />

      <label>Designation</label>
      <input
        type="text"
        value={designation}
        onChange={(e: any) => onEmployeeDesignationChange(e)}
      />

      <label>Company name</label>
      <input
        type="text"
        value={companyName}
        onChange={(e: any) => onEmployeeCompanyChange(e)}
      />

      <label>Employee Photo</label>
      <input
        type="file"
        accept="jpg"
        onChange={(e: any) => onEmployeePhotoChange(e)}
      />

      <button onClick={() => onSubmitClick()}>SUBMIT</button>
    </>
  );
};

export default EmployeeRegister;
