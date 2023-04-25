import axios from "axios";
import authHeader from "./auth-header";
export const API_URL = process.env.REACT_APP_API_URL;

export const getAllcustomers=()=>{
    return axios.get(API_URL+'customer',{headers: authHeader()})
        .then((response)=>{
            return response;
        })
}
export const storeCustomer=(data)=>{
    return axios.post(API_URL+'customer',data,{headers:authHeader()})
}
export const getCustomer=()=>{}
export const updateCustomer=()=>{}

