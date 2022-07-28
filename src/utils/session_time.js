import axios from "axios";
import { url } from "./HttpUrl";
import { useState } from "react";

// eslint-disable-next-line import/prefer-default-export,camelcase
export const session_time_func = () => {
  axios
    .get(`${url}/utils/session_time`)
    .then((res) => {
      // eslint-disable-next-line no-use-before-define
      removeTime(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeTime = (time) => {
  setInterval(() => {
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("current_user_data");
    console.log("session time");
  }, time);
};

// eslint-disable-next-line camelcase
export const current_user_fullname = () => {
  const user = window.localStorage.getItem("current_user_data");
  let name;
  if (user != null) {
    name = localStorage.getItem("current_user_data").split("****")[0].toString();
  } else {
    name = "--------";
  }
  return name;
};

export const currentUserId = () => {
  const user = window.localStorage.getItem("current_user_data");
  let userId;
  if (user != null) {
    userId = localStorage.getItem("current_user_data").split("****")[1];
  } else {
    userId = null;
  }
  return userId;
};

export const exitFunc = () => {
  window.localStorage.removeItem("login");
  window.localStorage.removeItem("current_user_data");
};
