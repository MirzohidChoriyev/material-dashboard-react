/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/HttpUrl";
import MDButton from "../../../components/MDButton";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const [json, setJson] = useState([]);
  const branchesData = () => {
    axios
      .get(`${url}/shop/all`)
      .then((res) => {
        setJson(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    branchesData();
  }, []);
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "name", accessor: "name", width: "30%", align: "left" },
      { Header: "view", accessor: "view", align: "left" },
      { Header: "this month damage", accessor: "monthDamage", align: "center" },
      { Header: "this month income", accessor: "monthIncome", align: "center" },
      { Header: "address", accessor: "address", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows:
      // eslint-disable-next-line no-unused-vars
      json.map((item, index) => ({
        name: <Project image={LogoAsana} name={item.name} />,
        view: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            <MDButton size="small" style={{ color: "blueviolet" }}>
              view
            </MDButton>
          </MDTypography>
        ),
        monthDamage: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>
              <span style={{ color: "red" }}>{item.damage} </span>
              <span style={{ color: "red" }}>UZS</span>
            </div>
          </MDTypography>
        ),
        monthIncome: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <div>
              <span style={{ color: "limegreen" }}>{item.damage} </span>
              <span style={{ color: "limegreen" }}>UZS</span>
            </div>
          </MDTypography>
        ),
        address: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.address}
          </MDTypography>
        ),
        completion: <Progress color="warning" value={item.status} />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <MDButton size="small" style={{ color: "green" }}>
              edit
            </MDButton>
            <MDButton size="small" style={{ color: "red" }}>
              delete
            </MDButton>
          </MDTypography>
        ),
      })),
  };
}
