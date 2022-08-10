
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { url } from "../../../utils/HttpUrl";

const initialValue = {
  fullname: "",
  username: "",
  password: "",
  shop_id: 0,
  roles:[
    {
      name: "ROLE_USER"
    }
  ]
};

function Cover() {
  const [config, setConfig] = useState(initialValue);
  const [branch, setBranch] = useState([]);

  const branchFunc = () => {
    axios
      .get(`${url}/shop/all`)
      .then((res) => {
        setBranch(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    branchFunc();
  }, []);

  const { username, password, fullname, shop_id, roles } = config;
  const [f_error, setFerror] = useState(false);
  const [u_error, setUerror] = useState(false);
  const [p_error, setPerror] = useState(false);
  const [e_error, setEerror] = useState(false);
  const [b_error, setBerror] = useState(false);
  const login_path = useNavigate();

  const inputValue = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "fullname") {
      setFerror(false);
    }
    if (e.target.name === "username") {
      setUerror(false);
      setEerror(false);
    }
    if (e.target.name === "password") {
      setPerror(false);
    }
    if (e.target.name === "shop_id") {
      setBerror(false);
    }
  };

  const save_data = () => {
    if (
      document.getElementById("fullname").value === "" ||
      document.getElementById("fullname").value.length < 10
    ) {
      setFerror(true);
    } else if (
      document.getElementById("login").value === "" ||
      document.getElementById("login").value.length < 5
    ) {
      setUerror(true);
    } else if (
      document.getElementById("password").value === "" ||
      document.getElementById("password").value.length < 4
    ) {
      setPerror(true);
    } else if (document.getElementById("shop_id").value === 0) {
      setBerror(true);
    } else if (
      // eslint-disable-next-line no-dupe-else-if
      document.getElementById("fullname").value === "" &&
      document.getElementById("login").value === "" &&
      document.getElementById("password").value === "" &&
      document.getElementById("shop_id").value === 0
    ) {
      setFerror(true);
      setUerror(true);
      setPerror(true);
      setBerror(true);
    } else {
      axios
        .post(`${url}/users/register`, config)
        .then((res) => {
          console.log(res.data.request);
          if (res.data.request === 0) {
            setEerror(true);
          } else {
            login_path("/authentication/sign-in");
            window.localStorage.setItem("sign_up", "save");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(config);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Fullname"
                variant="standard"
                value={fullname}
                onChange={(e) => inputValue(e)}
                id="fullname"
                name="fullname"
                fullWidth
              />
              <div className="error-message">
                {/* eslint-disable-next-line camelcase */}
                {f_error ? "Ismingizni to'liq kiriting" : ""}
              </div>
            </MDBox>
            <MDBox mb={2}>
              <FormControl variant="standard" size="1" fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="shop_id"
                  /* eslint-disable-next-line camelcase */
                  value={shop_id}
                  variant="standard"
                  name="shop_id"
                  label="demo-simple-select-label"
                  style={{ padding: "0px 0px 9px 0px" }}
                  onChange={(e) => inputValue(e)}
                >
                  <MenuItem value={0}>Tanlang</MenuItem>
                  {branch.map((item, index) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="error-message">
                {b_error ? "Filialni tanlang!" : ""}
              </div>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                value={username}
                onChange={(e) => inputValue(e)}
                id="login"
                name="username"
                label="Login"
                variant="standard"
                fullWidth
              />
              <div className="error-message">
                {u_error ? "Login kamida 5 ta belgidan ko'p bo'lishi kerak" : ""}
              </div>
              <div className="error-message">
                {e_error ? "Ushbu login ro'yxatdan o'tilgan boshqa login kiriting!" : ""}
              </div>
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={password}
                onChange={(e) => inputValue(e)}
                id="password"
                name="password"
                label="Password"
                variant="standard"
                fullWidth
              />
              <div className="error-message">
                {/* eslint-disable-next-line camelcase */}
                {p_error ? "Parol kamida 4 ta belgidan ko'p bo'lishi kerak" : ""}
              </div>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" onClick={() => save_data()} color="info" fullWidth>
                Sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
