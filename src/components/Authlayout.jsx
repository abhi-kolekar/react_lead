import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { validToken } from '../store/auth/authSlice';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const Authlayout=()=>{
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const user=useSelector((state)=>state.auth)


    useEffect(()=>{
        if(!user.userToken){
            navigate("/login");
        }else if(!user.isLoggedIn){
            dispatch(validToken())
        }
    },[user])

    return(
        <>
        <div className="container-scroller">
        {user.isLoggedIn
            ? <>
                <Navbar />
                <div className="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </div>  
            </>
            : <></>
        }
            
        </div>
        
        </>
    )
}
export default Authlayout;