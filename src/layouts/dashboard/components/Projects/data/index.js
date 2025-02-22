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
// import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";


import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../../../utils/HttpUrl";
import MDButton from "../../../../../components/MDButton";

export default function data() {
  const [json, setJson] = useState([]);

  const workerData = () => {
    axios
      .get(`${url}/shop/all`)
      .then((res) => {
        setJson(res.data.object);
        console.log(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(json);

  useEffect(() => {
    workerData();
  }, []);

  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <MDAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",
  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },
  //
  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "names", accessor: "companies", width: "45%", align: "left" },
      { Header: "view", accessor: "members", width: "10%", align: "left" },
      { Header: "budget", accessor: "budget", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
    ],

    rows:
      // eslint-disable-next-line no-unused-vars
      json.map((item, index) => ({
        companies: <Company image={logoXD} name={item.name} />,
        members: (
          <MDBox display="flex" py={1}>
            <MDButton size="small" style={{ color: "blueviolet" }}>
              View
            </MDButton>
          </MDBox>
        ),
        budget: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            UZS
          </MDTypography>
        ),
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={90} color="info" variant="gradient" label={false} />
          </MDBox>
        ),
      })),
  };
}
