import axios from "axios";
import {url} from "./HttpUrl";
import {useState} from "react";

export const time = () => {
    let day = new Date().getDate();
    let number = new Date().getMonth();
    let year = new Date().getFullYear();
    let month = "";

    switch (number){
        case 0: month = "Janvar"; break;
        case 1: month = "Fevral"; break;
        case 2: month = "Mart"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "Iyun"; break;
        case 6: month = "Iyul"; break;
        case 7: month = "Avgust"; break;
        case 8: month = "Sentyabr"; break;
        case 9: month = "Oktyabr"; break;
        case 10: month = "Noyabr"; break;
        case 11: month = "Dekabr"; break;
    }

    return day + " " + month + " " + year + " yil";
};

export const realTime = () => {
    let time = new Date();
    let day = new Date().getDate();
    let number = new Date().getMonth();
    let month = "";
    let hour = time.getHours() < 10 ? "0"+time.getHours() : time.getHours();
    let minutes = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();

    switch (number){
        case 0: month = "Janvar"; break;
        case 1: month = "Fevral"; break;
        case 2: month = "Mart"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "Iyun"; break;
        case 6: month = "Iyul"; break;
        case 7: month = "Avgust"; break;
        case 8: month = "Sentyabr"; break;
        case 9: month = "Oktyabr"; break;
        case 10: month = "Noyabr"; break;
        case 11: month = "Dekabr"; break;
    }

    return day + " " + month + " soat " + hour + ":" + minutes;
};

export const moneyMask=(number)=>{
    let result = number.toString(); // 7898999
    let arr = result.split("");
    result = "";
    for (let i = arr.length-1; i >= 0; i--) {
        result += arr[i];
    }
    arr = result.split("");
    result = ""; let str = "", natija = "";
    for (let i = 0; i < arr.length; i++) {
        if((i)%3==0 && i!=0){
            result = str + " ";
            natija += result;
            str = ""; result = "";
        }
        str += arr[i];
    }
    natija += str;
    arr = natija.split("");
    result = "";
    for (let i = arr.length-1; i >= 0; i--) {
        result += arr[i];
    }
    return result + " so'm";
}

//existByusername
const existByUsername = (username) => {
    axios
        .get(`${url}/users/existByUsername/${username}`)
        .then((res) => {

        })
        .catch((err) => {
            console.log(err);
        });
}

export const getExistByUsername = () => {
    return false;
}