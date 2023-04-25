import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import { getAllleads } from "../../services/leadService";
export const Allleads=createAsyncThunk("leads/Allleads",async(thunkAPI)=>{
    console.log('start')
    try{
        const response = await getAllleads();
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
    leads:[],
    lead:{}
}

const leadSlice=createSlice({
  name:"leads",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
        .addCase(Allleads.pending,(state,action)=>{
            state.loading = true;
        })
        .addCase(Allleads.fulfilled,(state,action)=>{
            state.loading = false;
            state.isLoaded = true;
            state.leads = action.payload.leads;
            state.lead = {};
        })
        .addCase(Allleads.rejected,(state,action)=>{
            state.loading = false;
        })
  }
})

export default leadSlice.reducer;