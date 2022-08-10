
import { useState, useEffect } from "react";
import "./Note.css";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import axios from "axios";
import { url } from "../../utils/HttpUrl";
import Icon from "@mui/material/Icon";
import MDButton from "../../components/MDButton";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel, Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { currentUserId } from "../../utils/session_time";
import { Navigate } from "react-router-dom";
import React from "react";
import {Modal} from "antd";

const initialValue = {
  message: "",
  comment: "",
  user_id: currentUserId(),
  type: "success",
}

function Notifications() {
  const [json, setJson] = useState([]);
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState(initialValue);
  const {message, comment, user_id, type} = config;
  const [m_error, setMerror] = useState(false);
  const [c_error, setCerror] = useState(false);
  const [id_param, setId_param] = useState("");

  const openModal=()=>{
    setShow(true);
  };

  const closeModal=()=>{
    setShow(false);
    setConfig({
      message: "",
      comment: "",
      user_id: currentUserId(),
      type: "success",
    });
    setId_param("");
  };

  const inputValue = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "message") {
      setMerror(false);
    }
    if (e.target.name === "comment") {
      setCerror(false);
    }
  };

  const edit_message_id = (id) => {
    axios
        .get(`${url}/notification/getById/${id}`)
        .then((res) => {
          setConfig(res.data.object);
          setId_param(id);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  console.log(config);

  const saveData = () => {
    if(id_param === ""){
      if (
          document.getElementById("message").value === ""
      ) {
        setMerror(true);
      } else if (
          document.getElementById("comment").value === ""
      ) {
        setCerror(true);
      } else if (
          document.getElementById("message").value === "" &&
          document.getElementById("comment").value === ""
      ) {
        setMerror(true);
        setCerror(true);
      } else {
        if (localStorage.getItem("login") !== null){
          axios
              .post(`${url}/notification/save`, config)
              .then((res) => {
                closeModal();
                getAllData();
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
        } else {
          <Navigate to="/authentication/sign-in" />
        }
      }
    } else {
      if (localStorage.getItem("login") !== null){
        axios
            .put(`${url}/notification/edit/${id_param}`, config)
            .then((res) => {
              closeModal();
              getAllData();
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
      } else {
        <Navigate to="/authentication/sign-in" />
      }
    }
  };

  const getAllData = () => {
    axios
      .get(`${url}/notification/getAll`)
      .then((res) => {
        setJson(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delete_message = (id) => {
    axios
        .delete(`${url}/notification/delete/${id}`)
        .then((res) => {
          console.log(res);
          getAllData();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return localStorage.getItem("login") === null ? (
    <Navigate to="/authentication/sign-in" />
  ) : (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={6} mb={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Card>
                <MDBox p={2} style={{justifyContent: 'space-between', display:'flex'}}>
                  <MDTypography variant="h5">Messages</MDTypography>
                  <MDTypography variant="h5">
                    <MDButton variant="gradient" color="dark" onClick={()=>openModal()}>
                      <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                      &nbsp;add new
                    </MDButton>
                  </MDTypography>
                </MDBox>
                <MDBox pt={2} px={2}>
                  {
                    json.map((item, index)=>(
                      <MDAlert color={item.user_id == user_id ? 'success': 'secondary'}>
                        <MDTypography variant="body2" style={{fontWeight:'500'}} color="white">
                          {item.message}
                        </MDTypography>
                        <span className="created_date">{item.create_date.split('T')[0] + " " + item.create_date.split('T')[1].substring(0, 5)}</span>
                        <span className="delete_message">
                          {item.user_id == user_id && <Icon sx={{ fontWeight: "bold" }} onClick={() => delete_message(item.id)}>delete</Icon> }
                        </span>
                        <span className="edit_message">
                          {item.user_id == user_id && <Icon sx={{ fontWeight: "normal" }} onClick={() => edit_message_id(item.id)}>edit</Icon> }
                        </span>
                      </MDAlert>
                    ))
                  }
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
      <div>
        <Modal title="Xabar kiritish" visible={show} closable={false} footer={false} style={{zIndex:'2000'}}>
          <TextField
            id="message"
            label="Message"
            name="message"
            value={message}
            onChange={inputValue}
            type="text"
            variant="filled"
            color="warning"
            focused
            fullWidth
            size="small"
          />
          <div className="error-message" style={{marginBottom:'15px'}}>
            {m_error ? "Ma'lumot kiriting!" : ""}
          </div>
          <TextField
            id="comment"
            label="Comment"
            name="comment"
            value={comment}
            onChange={inputValue}
            type="text"
            color="warning"
            variant="filled"
            size="small"
            focused
            fullWidth
          />
          <div className="error-message" style={{marginBottom:'15px'}}>
            {c_error ? "Ma'lumot kiriting!" : ""}
          </div>

          <FormControl size="small" style={{marginBottom:'10px', fontSize:'10px', marginLeft: '10px'}}>
            <FormLabel id="type" style={{fontSize:'11px', color: 'royalblue'}}>Message type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="type"
              name="type"
              value={type}
              onChange={inputValue}
              id = "type"
            >
              <FormControlLabel value="success" control={<Radio size="small" />} label="Xabar" />
              <FormControlLabel value="warning" control={<Radio size="small" />} label="Eslatma" />
            </RadioGroup>
          </FormControl>

          <div style={{borderTop:'1px solid ligthgray'}}>
            <Button variant="contained" size="small" color="primary" onClick={saveData} style={{color:'white'}}>
              Save
            </Button>
            <Button variant="contained" onClick={closeModal} size="small" color="error" style={{background:'red', color:'white', marginLeft:'7px'}}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Notifications;
