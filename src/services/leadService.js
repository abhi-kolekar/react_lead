import axios from "axios";
import authHeader from "./auth-header";
export const API_URL = process.env.REACT_APP_API_URL;

export const getAllleads=()=>{
    return axios.get(API_URL+'leads/alleads',{headers: authHeader()})
        .then((response)=>{
            return response;
        })
}
export const storeLead=(data)=>{
    return axios.post(API_URL+'leads',data,{headers:authHeader()})
}
export const getLead=()=>{}
export const updateLead=()=>{}

