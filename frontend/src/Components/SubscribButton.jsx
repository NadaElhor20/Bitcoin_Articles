import React, { useState } from "react";
import axios from "../Apis/axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SubscribButton = (props) => {
  const navigate = useNavigate();
  const [prop, setProp] = useState(props);
  const auth = JSON.parse(localStorage.getItem("auth"));

  const getSubList = async () => {
    await axios
      .patch(
        `/user/${auth.user?._id}`,
        { list: `${props.sourseKey}` },
        {
          headers: {
            authentication: `${auth?.token}`,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setProp({ color: "error", name: "unsub" });
      })
      .catch((err) => {
        navigate("/users/signin");
        window.location.reload(true);
      });
  };
  const deleteSubList = async () => {
    await axios
      .delete(`/user/${auth.user?._id}`, {
        headers: {
          authentication: `${auth?.token}`,
          "content-type": "application/json",
        },
        data: {
          list: `${props.sourseKey}`,
        },
      })
      .then((res) => {
        setProp({ color: "primary", name: "sub" });
      })
      .catch((err) => {
        navigate("/users/signin");
      });
  };

  const handleClickButton = () => {
    if (prop.name === "sub") {
      getSubList();
    } else {
      deleteSubList();
    }
  };

  return (
    <Button
      color={`${prop.color}`}
      className={`button ${prop.name}`}
      onClick={() => handleClickButton(prop.name)}
    >
      {prop.name}
    </Button>
  );
};
