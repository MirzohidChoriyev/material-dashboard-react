
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { url } from "../../utils/HttpUrl";
import { currentUserId } from "../../utils/session_time";
import {Telegram} from "@mui/icons-material";
import {moneyMask, realTime, time} from "../../utils/utils";
import MDTypography from "../../components/MDTypography";

function Overview() {
  const [json, setJson] = useState([]);
  const [salary, setSalary] = useState([]);

  const userData = () => {
    axios
      .get(`${url}/users/getByUser/${currentUserId()}`)
      .then((res) => {
        setJson(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSalary = () => {
        axios
            .get(`${url}/salaries/getsalary/${currentUserId()}`)
            .then((res) => {
                setSalary(res.data.object);
            })
            .catch((err) => {
                console.log(err);
            });
  };

  useEffect(() => {
    userData();
    getSalary();
  }, []);

  return localStorage.getItem("login") === null ? (
    <Navigate to="/authentication/sign-in" />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description={json.work_place === null ? "-----" : json.work_place}
                info={{
                  fullName: `${json.fullname}`,
                  mobile: `${json.phone_number === null ? "-----" : json.phone_number}`,
                  location: `${json.address === null ? "-----" : json.address}`,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <Telegram />,
                    color: "facebook",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
                <MDBox p={2}>
                    <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                        salary table
                    </MDTypography>
                </MDBox>
                <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
                    <MDBox mt={3} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d5b3ff">
                        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
                            date
                        </MDTypography>
                        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
                            {realTime()}
                        </MDTypography>
                    </MDBox>

                    {
                        salary.map((item, key)=>(
                            <MDBox mt={3} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d5b3ff">
                                <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
                                    <span style={{color:'blueviolet'}}>{item.name}</span>
                                </MDTypography>
                                <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
                                    <span style={{color:'#1ad546'}}>{moneyMask(item.value)}</span>
                                </MDTypography>
                            </MDBox>
                        ))
                    }

                </MDBox>

            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
