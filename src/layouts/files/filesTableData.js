
import { useEffect, useState } from "react";
import axios from "axios";
import {url} from "../../utils/HttpUrl";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import {date_mask} from "../../utils/utils";
import "./Style.css";

export default function data() {
    const [json, setJson] = useState([]);
    const [users, setUsers] = useState([]);

    const getAll = () => {
        axios
            .get(`${url}/userImage/allimage`)
            .then((res) => {
                setJson(res.data.object);
                window.localStorage.setItem("product", "");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const userData = () => {
        axios
            .get(`${url}/users/getUsers`)
            .then((res) => {
                setUsers(res.data.object);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        getAll();
        userData();
    }, [localStorage.getItem('product') === 'save']);

    return {
        columns: [
            { Header: "Fullname", accessor: "user_name", align: "left" },
            { Header: "Image", accessor: "image_name", align: "left" },
            { Header: "Bazadagi nomi", accessor: "uploadName", align: "left" },
            { Header: "Yuklangan yo'li", accessor: "uploadPath", align: "left" },
            { Header: "Hash id", accessor: "hashId", align: "center" },
            { Header: "id", accessor: "id", align: "center" },
            { Header: "File size", accessor: "fileSize", align: "center" },
            { Header: "Qo'shilgan sana", accessor: "date", align: "center" },
            { Header: "User id", accessor: "userId", align: "center" },
            { Header: "Tahrirlash", accessor: "action", align: "center" },
        ],

        rows:
            json.map((item, index) => ({
                user_name: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                        <img src={`${url}/userImage/readImage/${item.hashId}`} id = "user_image" /> {item.name}
                    </MDTypography>
                ),
                image_name: (
                    <MDTypography variant="caption" color="text" fontWeight="medium">
                       {item.name}
                    </MDTypography>
                ),
                uploadName: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.uploadName}
                    </MDTypography>
                ),
                uploadPath: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.uploadPath}
                    </MDTypography>
                ),
                hashId: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.hashId}
                    </MDTypography>
                ),
                id: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.id}
                    </MDTypography>
                ),
                fileSize: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.fileSize} Byte / {Math.round(item.fileSize / 1024)} Kb
                    </MDTypography>
                ),
                date: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {date_mask(item.createdDate)}
                    </MDTypography>
                ),
                userId: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {item.userId}
                    </MDTypography>
                ),
                action: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        <MDButton disabled size="small" style={{ color: "red" }}>
                            delete
                        </MDButton>
                    </MDTypography>
                ),
            })),
    };
}
