
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Icon from "@mui/material/Icon";
import MDButton from "../../components/MDButton";
import React from "react";
import {Modal, Button} from "antd";
import {useState} from "react";
import "./style.css";
import axios from "axios";
import {url} from "../../utils/HttpUrl";

const initialValue = {
  name: "",
  description: "----",
  incomePrice: "",
  salePrice: "",
  category_id: "1000",
  count: "",
  count_note: "",
  valyuta: "S000",
}

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState(initialValue);
  const {name, description, incomePrice, salePrice, category_id, count, count_note, valyuta} = config;

  const closeModal=()=>{
    setShow(false);
  }

  function inputValue(e) {
    setConfig({...config, [e.target.name]: e.target.value});
  }

  function saveProduct(){
    axios
        .post(`${url}/product/save`, config)
        .then((res) => {
          window.localStorage.setItem("product", "save");
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white" display="flex" alignItems = "center" justifyContent = "space-between">
                    <div>Products</div>
                    <div>
                      <MDButton variant="gradient" color="dark" onClick={() => setShow(true)}>
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;add new
                      </MDButton>
                    </div>
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                      table={{ columns: pColumns, rows: pRows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>

      <Modal title="Mahsulot kiritish" visible={show} closable={false} footer={false}>
        <div className="item-block">
          <label for = "name" className="label-item"><span style={{color:'crimson', marginRight:'1px'}}>*</span>Mahsulot nomi</label>
          <input type="text" name="name" className="input-item" id = "name" value={name} onChange={inputValue}/>
        </div>

        <div className="item-block">
          <label htmlFor="valyuta" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Hisoblash valyutasi</label>
          <select name="valyuta" className="select-item" id="valyuta" value={valyuta} onChange={inputValue}>
            <option value={"S000"}>So'm</option>
            <option value={"D000"}>Dollar</option>
            <option value={"E000"}>Evro</option>
          </select>
        </div>

        <div className="item-block">
          <label htmlFor="incomePrice" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Kirish narxi</label>
          <input type="number" name="incomePrice" className="input-item" id="incomePrice" value={incomePrice} onChange={inputValue}/>
        </div>

        <div className="item-block">
          <label htmlFor="salePrice" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Sotuv narxi</label>
          <input type="number" name="salePrice" className="input-item" id="salePrice" value={salePrice} onChange={inputValue}/>
        </div>

        <div className="item-block">
          <label htmlFor="count" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Soni</label>
          <input type="number" name="count" className="input-item" id="count" value={count} onChange={inputValue}/>
        </div>

        <div className="item-block">
          <label htmlFor="count_note" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Eslatma soni</label>
          <input type="number" name="count_note" className="input-item" id="count_note" value={count_note} onChange={inputValue}/>
        </div>

        <div className="item-block">
          <label htmlFor="category_id" className="label-item"><span style={{color: 'crimson', marginRight: '1px'}}>*</span>Kategoriyasi</label>
          <select name="category_id" className="select-item" id="category_id" value={category_id} onChange={inputValue}>
            <option value="1000">Kategoriya1</option>
            <option value="2000">Kategoriya2</option>
          </select>
        </div>

        <div style={{borderTop:'1px solid ligthgray'}}>
          <Button variant="contained" type="primary" onClick={saveProduct} style={{color:'white'}}>
            Saqlash
          </Button>
          <Button variant="contained" onClick={closeModal} style={{background:'gray', border:'1px solid gray', color:'white', marginLeft:'7px'}}>
            Yopish
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Tables;
