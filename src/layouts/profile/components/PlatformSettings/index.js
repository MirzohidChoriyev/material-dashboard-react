
import { useState } from "react";
import Card from "@mui/material/Card";
import "../../../notifications/Note.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import {Button, message, Modal} from "antd";
import axios from "axios";
import {url} from "../../../../utils/HttpUrl";
import {currentUserId} from "../../../../utils/session_time";
import {getExistByUsername} from "../../../../utils/utils";

function PlatformSettings() {
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState({
    username: ""
  });
  const {username} = config;
  const [param, setParam] = useState("");
  const [error, setError] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [u_error, setUerror] = useState(false);

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

  const login_change = (e) => {
    axios
        .get(`${url}/users/getByUser/${currentUserId()}`)
        .then((res) => {
          setParam(e);
          openModal();
          setConfig(res.data.object);
          setUser_name(res.data.object.username);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const editLogin = () => {
    if(user_name === username){
      axios
          .put(`${url}/users/loginEdit/${currentUserId()}`, config)
          .then((res) => {
            closeModal();
          })
          .catch((err) => {
            warning("Xatolik mavjud!");
          });
    } else {
        if(getExistByUsername(config.username)){
          axios
              .put(`${url}/users/loginEdit/${currentUserId()}`, config)
              .then((res) => {
                closeModal();
                success("Tahrirlandi!");
              })
              .catch((err) => {
                warning("Xatolik mavjud!");
              });
        } else {
          setError(true);
        }
    }
  };

    console.log(existByUsername(username));

  return (
    <div>
      <Card sx={{ boxShadow: "none" }}>
        <MDBox p={2}>
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            platform settings
          </MDTypography>
        </MDBox>
        <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
          <MDBox mt={3} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d5b3ff">
            <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
              password change
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
              <Button type="primary" size="small" style={{color:'white'}}>Change</Button>
            </MDTypography>
          </MDBox>

          <MDBox mt={3} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #d5b3ff">
            <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
              login change
            </MDTypography>
            <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
              <Button type="primary" size="small" style={{color:'white'}} onClick={() => login_change("login")}>Change</Button>
            </MDTypography>
          </MDBox>

        </MDBox>
      </Card>
      <Modal title="Ma'lumotni tahrirlash" visible={show} closable={false} footer={false} style={{zIndex:'2000'}}>
        { param === "login" &&
          <div className="form-class">
            <label className="label_class"><span id = "span_label">*</span>Yangi login kiriting</label>
            <input type="text" placeholder="------" value={username} onChange={inputValue} name = "username" id = "username" className="input_class"/>
            <div className="error-message">
              {/* eslint-disable-next-line camelcase */}
              {u_error ? "Login kamida 5 ta belgidan ko'p bo'lishi kerak" : ""}
            </div>
            <div className="error-message">
              {/* eslint-disable-next-line camelcase */}
              {error ? "Ushbu login ro'yxatdan o'tilgan boshqa login kiriting!" : ""}
            </div>
          </div>
        }
        <div className="footer_class">
          <Button type="primary" onClick={editLogin} id = "save_button" color="primary" style={{color:'white'}}>Edit</Button>
          <Button type="contained" onClick={closeModal} id = "close_button" style={{color:'white', background:'#8f8f8f'}}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}

export default PlatformSettings;
