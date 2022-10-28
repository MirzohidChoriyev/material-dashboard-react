import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import DataTable from "../../examples/Tables/DataTable";
import filesTableData from './filesTableData'
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import {Button, Modal} from "antd";
import {url} from "../../utils/HttpUrl";

function File() {
    const { columns: pColumns, rows: pRows } = filesTableData();
    const [show, setShow] = useState(false);

    const userImageSee = () =>{
        setShow(localStorage.getItem("userHashId") !== "");
    };

    useEffect(()=>{
        userImageSee();
    }, [localStorage.getItem("userHashId") !== null]);

    return(
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
                                        <div>Users images</div>
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

            <Modal title="User information" visible={show} footer = {false}>
                <div>
                    <img src={`${url}/userImage/readImage/${localStorage.getItem("userHashId")}`}
                         style={{ width: '50%', height: '300px', borderRadius: '6px' }} />
                </div>
                <div style={{marginTop: '10px'}}>
                    <Button type="primary" onClick={() => setShow(false)}>Close</Button>
                </div>
            </Modal>
        </div>
    );
} export default File;