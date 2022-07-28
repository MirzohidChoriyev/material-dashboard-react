/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState } from "react";

// react-router-dom components
import { Link, Navigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import { Alert, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { url } from "../../../utils/HttpUrl";
import "./Login.css";

const initialValue = {
  username: "",
  password: "",
};

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [config, setConfig] = useState(initialValue);
  const { username, password } = config;
  const [error, setError] = useState(false);
  // eslint-disable-next-line camelcase
  const [u_error, setUerror] = useState(false);
  // eslint-disable-next-line camelcase
  const [p_error, setPerror] = useState(false);
  // eslint-disable-next-line camelcase
  const [pas_error, setPasError] = useState(false);
  // eslint-disable-next-line camelcase
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    localStorage.setItem("sign_up", "");
  };

  useEffect(() => {
    if (localStorage.getItem("sign_up") === "save") {
      handleClick();
    }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleClose = (event, reason) => {
    if (reason === "clickable") {
      return;
    }
    setOpen(false);
  };

  const inputValue = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "username") {
      setUerror(false);
      setError(false);
    }
    if (e.target.name === "password") {
      setPerror(false);
      setPasError(false);
    }
  };

  const login = () => {
    if (
      document.getElementById("login").value === "" ||
      document.getElementById("login").value.length < 5
    ) {
      setUerror(true);
    } else if (
      document.getElementById("password").value === "" ||
      document.getElementById("password").value.length < 4
    ) {
      setPerror(true);
      // eslint-disable-next-line no-dupe-else-if
    } else if (
      // eslint-disable-next-line no-dupe-else-if
      document.getElementById("login").value === "" &&
      document.getElementById("password").value === ""
    ) {
      setUerror(true);
      setPerror(true);
    } else {
      axios
        .post(`${url}/login`, config)
        .then((res) => {
          if (res.data.request === 0) {
            setError(true);
            console.log(res.data);
          } else {
            setError(false);
            console.log(res.data.object);
            window.localStorage.setItem("login", res.data.object.token);
            window.localStorage.setItem("current_user_data", res.data.object.current_user);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          setPasError(true);
        });
    }
  };

  console.log(config);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return localStorage.getItem("login") !== null ? (
    <Navigate to="/product" />
  ) : (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="username"
                id="login"
                value={username}
                onChange={inputValue}
                name="username"
                label="Login"
                fullWidth
              />
              <div className="error-message">
                {/* eslint-disable-next-line camelcase */}
                {u_error ? "Login kamida 5 ta belgidan ko'p bo'lishi kerak!" : ""}
              </div>
              <div className="error-message">{error ? "Bu foydalanuvchi mavjud emas!" : ""}</div>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                id="password"
                value={password}
                onChange={inputValue}
                name="password"
                label="Password"
                fullWidth
              />
              <div className="error-message">
                {/* eslint-disable-next-line camelcase */}
                {p_error ? "Parol kamida 4 ta belgidan ko'p bo'lishi kerak!" : ""}
              </div>
              {/* eslint-disable-next-line camelcase */}
              <div className="error-message">{pas_error ? "Parol noto'g'ri kiritildi" : ""}</div>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={() => login()} color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={7000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Muvaffaqiyatli ro'yxatdan o'tdingiz! Login parolingizni kiritib tizimga kirishingiz
            mumkin.
          </Alert>
        </Snackbar>
      </Stack>
    </BasicLayout>
  );
}

export default Basic;
