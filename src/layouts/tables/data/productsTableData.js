
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

import team2 from "assets/images/team-2.jpg";

import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/HttpUrl";

export default function data() {
  const [json, setJson] = useState([]);

  const userData = () => {
    axios
      .get(`${url}/products/all`)
      .then((res) => {
        setJson(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    userData();
  }, []);
  return {
    columns: [
      { Header: "author", accessor: "author", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "registered time", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows:
      json.map((item, index) => ({
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.created_date.split("T")[0] + " o'clock " + item.created_date.split("T")[1].substring(0, 5)}
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <span style={{ color: "blueviolet" }}>Edit</span>
          </MDTypography>
        ),
      })),
  };
}
