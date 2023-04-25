import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./auth/authSlice";
import messageReducer from "./message"
import leadsReducer from "./lead/leadSlice"
import customerReducer from "./customer/customerSlice"

const reducer = {
    auth:authReducer,
    lead:leadsReducer,
    message: messageReducer
}

 const store = configureStore({
    //reducer: reducer,
    reducer: {
        auth:authReducer,
        lead:leadsReducer,
        customer:customerReducer,
        message: messageReducer
    },
    devTools: true,
})

export default store;