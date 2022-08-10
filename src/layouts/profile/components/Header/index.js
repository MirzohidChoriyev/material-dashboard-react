
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import "./Style.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import breakpoints from "assets/theme/base/breakpoints";
import userImage from "assets/images/user_image.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import axios from "axios";
import { current_user_fullname, currentUserId } from "../../../../utils/session_time";
import { url } from "../../../../utils/HttpUrl";
import $ from 'jquery';

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [json, setJson] = useState([]);
  const [error, setError] = useState(false);
  const [hashId, setHashId] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const openImageUpload = () => {
        $('#image').trigger('click');
    }

    const readImage = () => {
        if(currentUserId() !== null){
            axios.get(`${url}/userImage/readImageHashId/${currentUserId()}`)
                .then(res=>{
                    setHashId(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        } else {
            setHashId("");
        }
    }

    useEffect(()=>{
        readImage();
    }, [])

    const handleSubmit = async (event) => {
        if(currentUserId() !== null){
            if(selectedFile !== null){
                event.preventDefault()
                const formData = new FormData();
                formData.append("image", selectedFile);
                try {
                    const response = await axios({
                        method: "post",
                        url: `${url}/userImage/save/${currentUserId()}`,
                        data: formData,
                        headers: {"Content-Type": "multipart/form-data"},
                    });
                } catch (error) {
                    console.log(error);
                }
                setSelectedFile(null);
                readImage();
            } else {
                setError(true);
            }
        }
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

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
  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);

    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item position="relative">
            <MDAvatar src={hashId != "" ? `${url}/userImage/readImage/${hashId}` : userImage} alt="profile-image" size="xl" shadow="sm" />
              <span id = "user_image_edit">
                  <CollectionsOutlinedIcon onClick={openImageUpload} fontSize="small" style = {{cursor:'pointer', position:'absolute', bottom:'0px', right:'-6px'}} />
                  <form onSubmit={handleSubmit} className="form_class_file">
                      <input type="file" name = "image" className="upload_image_input" onChange={handleFileSelect} id = "image" accept="image/*" />
                      <input type="submit" style={{display: selectedFile !== null ? "block" : "none"}} name = "button" className="image_edit_button" id = "button" value="Save" />
                  </form>
              </span>
              <div style={{color:"red", fontSize:'12px'}}>{error && "Rasm kiritishingiz kerak."}</div>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {current_user_fullname()}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {json.work_place}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Message"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      email
                    </Icon>
                  }
                />
                <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
