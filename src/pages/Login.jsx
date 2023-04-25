import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import {toast } from 'react-toastify';
import { Link } from "react-router-dom";
import logo2 from '../assets/images/logo2.png'; 
import logo3 from '../assets/images/logo3.png'; 

import { useDispatch, useSelector } from "react-redux";
import {userLogin,validToken} from "../store/auth/authSlice";
import { clearMessage } from "./../store/message";

const Login =()=>{
    const {loading,userInfo,isLoggedIn}= useSelector((state) => state.auth);


    const [username, setUsername] = useState("abhi@mail.com");
    const [password, setPassword] = useState("123456789");
    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [error, seterror] = useState(false);
    //const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
       let leaduser=localStorage.getItem('leaduser')
        if(leaduser){
            dispatch(validToken())
        }
    },[])

    useEffect(()=>{
       /*  if(loading=='pending'){
            toast.info('Logging in...')
        }
        if(loading=='rejected'){
            toast.dismiss();
            toast.error('User Unauthenticated')
        }
        if(loading=='fulfilled'){
            toast.dismiss();
            toast.success('Login successfully')
        }
         */
    },[loading])

    useEffect(()=>{
         if(isLoggedIn){
            setTimeout(() => {
                return navigate("/");
              }, 2000); 
         }
     },[isLoggedIn]) 
    
    const handleSubmit = (e) => {
        
        e.preventDefault();
        setUsernameErr('');
        setPasswordErr('');
        seterror(false);
        if(username.length <= 6 && password.length <= 6){
           setUsernameErr('The Username field is required.');
           setPasswordErr('The Password field is required.');
           seterror(true);
           return false;
        }
        if(username.length <= 6){
         setUsernameErr('Incorrect Username');
         seterror(true);
         return false;
        }
        if(password.length <= 5){
         setPasswordErr('Please Enter Correct Password');
         seterror(true);
         return false;
        }

        dispatch(userLogin({ username, password }))
        
    
    }
   
    const loadingmsg=(loading=='pending')?'PLEASE WAIT ...':'SIGN IN';
    return(
        <>
            <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper d-flex align-items-center auth">
                <div className="row d-flex justify-content-end w-100">
            
                <div className="col-lg-4 mx-auto">
                    <div className="auth-form-light text-left p-4">
                    <div className="brand-logo text-center">
                        <img src={logo2}  style={{'maxWidth':'50px'}} />
                        <img src={logo3}  />
                    </div>
                    <h4 className="text-center">Hello! let's get started</h4>
                    <h6 className="font-weight-light text-center">Sign in to continue.</h6>
                    {error &&(
                        <div className="alert alert-dismissible alert-danger">
                            {usernameErr}	
                            {passwordErr}			
                        </div>
                    )}
                    <Form className="pt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="username" value={username}  onChange={(e)=>setUsername(e.target.value)}  placeholder="Username" size="lg" className="h-auto" autoComplete="off" required  style={{borderRadius: '5px'}} />
                        </Form.Group>
                        <Form.Group className="mb-3"> 
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password"  value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder="Password" size="lg" className="h-auto" autoComplete="off" required style={{borderRadius: '5px'}} />
                        </Form.Group>
                        <div className="mt-3">
                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" disabled={(loading=='pending')?true:false} >{loadingmsg}</button>
                        </div>
                        <Link className="auth-link text-black" to="/reset">Forgot password?</Link>
                    </Form>
                    </div>
                </div>

            
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Login;