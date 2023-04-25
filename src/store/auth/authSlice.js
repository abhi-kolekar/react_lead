import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast } from 'react-toastify';
import  AuthService from "../../services/auth.service";

import { setMessage } from "./../message";

export const validToken = createAsyncThunk("auth/validToken",async(thunkAPI)=>{
  console.log('validuser1')
    try{
      const response = await AuthService.validToken();
      console.log(response.data)
      return response.data;
    }catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        //console.log(message)
    }
});
export const registerUser = createAsyncThunk('auth/register');
export const userLogin1  = createAsyncThunk('auth/login',async({username, password},thunkAPI)=>{
    try{
      const response = await AuthService.login({username, password});
     // thunkAPI.dispatch(setMessage(response.data.message));
      console.log(response)
      return response.data;
    }catch(error){
      console.log(error)
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(message)
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue()

    }
});

export const userLogin  = createAsyncThunk('auth/login',async({username, password},thunkAPI)=>{

  let resp=toast.promise(AuthService.login({username, password}),
    {
      pending: 'Logging in...',
      success: 'Login successfully',
      error: 'User Unauthenticated'
    }).then((response) => {
      console.log(response)
      return response.data;
    }).catch(function (error) {
      console.log(error)
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
          console.log(message)
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue()
    })
    return resp;
});

export const userLogout = createAsyncThunk();

//const user = JSON.parse(localStorage.getItem("token"));
//localStorage.setItem("auth", JSON.stringify(res.data));
//localStorage.setItem('auth', 123456);
//const user = JSON.parse(localStorage.getItem("auth"));
const user = JSON.parse(localStorage.getItem("leaduser"));
const userToken = user?user.token:null;

//console.log(userToken)
const initialState = {
    loading: false,
    isLoggedIn: false,
    userInfo: {}, // for user object
    userToken: userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
  }

  const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
      logOut:(state)=>{
        localStorage.removeItem('leaduser');
        state.isLoggedIn = false
        state.userInfo = {}
        state.userToken= null
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(validToken.pending, (state, action) => {
          state.loading = "pending";
        })
        .addCase(validToken.fulfilled, (state, action) => {
          state.loading = "Complete";
          state.isLoggedIn = true;
          state.userInfo = action.payload;
        })
        .addCase(validToken.rejected, (state, action) => {
          state.loading = "rejected";
        });
      builder
        .addCase(userLogin.pending, (state, action) => {
          state.isLoggedIn = false;
          state.loading = "pending";
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          console.log(action.payload)
          state.isLoggedIn = true;
          state.userInfo = action.payload.user;
          state.userToken = action.payload.token;
          state.loading = "fulfilled";
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.isLoggedIn = false;
          state.loading = "rejected";
        });

      
    }
  })
// export actions
export const {logOut} =authSlice.actions;
export default authSlice.reducer;

  