import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'

import { useDispatch, useSelector } from "react-redux";

import Authlayout from './components/Authlayout';
import Login from './pages/Login';
import Home from './dashboard/Home';

import Leads from './leads/Leads';
import Listlead from './leads/Listlead';
import Addlead from './leads/Addlead';
import Viewlead from './leads/Viewlead';

import Customers from './customers';
import Sales from './sales';
import Accounts from './accounts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
 

 
  return (
    <div className="App">
      <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Authlayout />}>
            <Route index element={<Home />}></Route>  
            <Route path="/home" element={<Home />}></Route>  
            <Route path="/leads" element={<Leads />}>
                <Route index element={<Listlead />}></Route>
                <Route path="add" element={<Addlead />}></Route>  
                <Route path=":leadId" element={<Viewlead />}></Route>  
            </Route>   
            <Route path="/customers/*" element={<Customers />}></Route>  
            <Route path="/sales/*" element={<Sales />}></Route>  
            <Route path="/purchase/*" element={<h1>purchase </h1>}></Route>
            <Route path="/accounts/*" element={<Accounts />}></Route>
            <Route path="/inventory" element={<h1>inventory </h1>}></Route>  
            <Route path="/calendar" element={<h1>calendar </h1>}></Route>   
            <Route path="/report" element={<h1>report </h1>}></Route>  
            <Route path="/setting" element={<h1>setting </h1>}></Route>  
        </Route>
        
        <Route path="login" element={<Login />}></Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
