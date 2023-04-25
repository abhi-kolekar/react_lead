import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import { getAllcustomers } from "../../services/customerService";

export const Allcustomers=createAsyncThunk("customers/Allcustomers",async(thunkAPI)=>{
    try{
        const response = await getAllcustomers();
        console.log(response.data)
        return response.data;
        }catch(error){
            const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString();
              console.log(message)
    }

});
const initialState={
    loading: false, 
    isLoaded:false, 
    customers:[],
    customer:{}
}

const customerSlice=createSlice({
    name:"customers",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(Allcustomers.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(Allcustomers.fulfilled,(state,action)=>{
                state.loading = false;
                state.isLoaded = true;
                state.customers = action.payload.customer;
                state.customer = {};
            })
            .addCase(Allcustomers.rejected,(state,action)=>{
                state.loading = false;
            })
      }
})

export default customerSlice.reducer;