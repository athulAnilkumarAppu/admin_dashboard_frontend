"use client";

import { useContext, useState } from "react";

import { userContext } from "@/app/ContextApiWrapper";
import axios from "axios";

import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  const router = useRouter();

  const { nameOfUser, setNameOfUser } = useContext(userContext);

  const [htmlContent, setHtmlContent] = useState<any>("");
  const [previewClicked, setPreviewClicked] = useState<boolean>(false);

  const doc = new jsPDF({
    format: "a4",
    unit: "px",
  });

  const downloadService = async () => {
    await axios
      .post(
        "http://localhost:3000/profileTemplate",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setHtmlContent(response.data);
          doc.html(response.data, {
            async callback(doc) {
              await doc.save("Profile.pdf");
            },
          });
        }
      });
  };

  const onDownloadClick = () => {
    downloadService();
  };

  const onPreviewClick = () => {
    axios
      .post(
        "http://localhost:3000/profileTemplate",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: any) => {
        if (response) {
          setHtmlContent(response.data);
        }
      });
    setPreviewClicked(!previewClicked);
  };

  const onUsersPageClick = () => {
    router.push("/allusers");
  };

  const onEditUsersClick = () => {
    router.push("/editusers");
  };

  const onRegisterEmployeeClick = () => {
    router.push("/employeeRegister");
  };

  const onEditEmployeeClick = () => {
    router.push("/viewAllEmployees");
  };

  return (
    <>
      <h2>Hi</h2>
      <button onClick={() => onDownloadClick()}>Download</button>
      <button onClick={() => onPreviewClick()}>Preview</button>
      {htmlContent && previewClicked && (
        <iframe
          style={{ width: "100vw", height: "100vh" }}
          srcDoc={htmlContent}
        ></iframe>
      )}
      <button onClick={() => onUsersPageClick()}>Show Users</button>
      <button onClick={() => onEditUsersClick()}>Edit Users</button>
      <button onClick={() => onRegisterEmployeeClick()}>
        Register Employee
      </button>
      <button onClick={() => onEditEmployeeClick()}>Edit Employees</button>
    </>
  );
};

export default Dashboard;
