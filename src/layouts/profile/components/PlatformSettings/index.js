
import { useState } from "react";
import Card from "@mui/material/Card";
import "../../../notifications/Note.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {Button, message, Modal} from "antd";

function PlatformSettings() {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState({
    password: "",
      new_password: "",
  });
  const {password, new_password} = config;
  const [param, setParam] = useState("");
  const [error, setError] = useState(false);

  const openModal=()=>{
    setShow(true);
  };

  const closeModal=()=>{
    setShow(false);
    setConfig({
      username: ""
    });
    setParam("");
  };

  const inputValue = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const success = (text) => {
    message.success(text);
  };
  const warning = (text) => {
    message.warning(text);
  };

  return (
    <div>
      <Card sx={{ boxShadow: "none" }}>
        <MDBox p={2}>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            platform settings
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
          <MDBox mt={3}>
            <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
              password change
            </MDTypography>
            <MDTypography color="text">
                <div className="form_class">
                    <label className="label_class"><span id = "span_label">*</span>Eski parolni kiriting</label>
                    <input type="password" value={password} onChange={inputValue} name = "password" id = "username" className="input_class"/>
                </div>
                <div className="form_class">
                    <label className="label_class"><span id = "span_label">*</span>Yangi parolni kiriting</label>
                    <input type="password" value={new_password} onChange={inputValue} name = "new_password" id = "username" className="input_class"/>
                </div>
                <div className="footer_class">
                    <Button type="primary" id = "save_button" color="primary" style={{color:'white'}}>Edit</Button>
                </div>
            </MDTypography>
          </MDBox>

        </MDBox>
      </Card>
    </div>
  );
}

export default PlatformSettings;
