import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../../utils/HttpUrl";
import MDButton from "../../../components/MDButton";
import {date_mask} from "../../../utils/utils";

export default function data() {
  const [json, setJson] = useState([]);

  const productData = () => {
    axios
      .get(`${url}/product/all`)
      .then((res) => {
        setJson(res.data.object);
        window.localStorage.setItem("product", "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
      productData();
  }, []);

    useEffect(() => {
        productData();
    }, [localStorage.getItem('product') === 'save']);

    function delete_product(id) {
        axios
            .delete(`${url}/product/delete/${id}`)
            .then((res) => {
                productData();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
    columns: [
      { Header: "Mahsulot nomi", accessor: "name", width: "30%", align: "left" },
      { Header: "Kirish narxi", accessor: "income_price", align: "left" },
      { Header: "Sotuv narxi", accessor: "sale_price", align: "center" },
      { Header: "Qolgan soni", accessor: "count", align: "center" },
      { Header: "Umumiy soni", accessor: "all_count", align: "center" },
      { Header: "id", accessor: "id", align: "center" },
      { Header: "Qo'shilgan sana", accessor: "date", align: "center" },
      { Header: "Tahrirlash", accessor: "action", align: "center" },
    ],

    rows:
      json.map((item, index) => ({
          name: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {item.name}
              </MDTypography>
          ),
          income_price: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {item.incomePrice}
              </MDTypography>
          ),
        sale_price: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.salePrice}
          </MDTypography>
        ),
          count: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {item.count}
          </MDTypography>
        ),
          all_count: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {item.all_count}
          </MDTypography>
        ),
          id: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {item.id}
              </MDTypography>
          ),
          date: (
              <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {date_mask(item.createdDate)}
              </MDTypography>
          ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            <MDButton size="small" style={{ color: "green" }}>
              edit
            </MDButton>
            <MDButton onClick = {() => delete_product(item.id)} size="small" style={{ color: "red" }}>
              delete
            </MDButton>
          </MDTypography>
        ),
      })),
  };
}
