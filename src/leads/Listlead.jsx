import {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Pageheader from "../components/Pageheader";
import { useDispatch, useSelector } from "react-redux";
import {Allleads} from "./../store/lead/leadSlice"
import Leadtable from './Leadtable';


const Listlead=()=>{
    const lead      = useSelector((state)=>state.lead);
    const dispatch  = useDispatch();
    useEffect(()=>{
        if(!lead.isLoaded){
            dispatch(Allleads())
        }
    },[lead])
 
    return(
        <>
        <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-filter"></i>
              </span> Leads
            </h3>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    Lead
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                        <Link  to='/leads/add'>Add Lead</Link>
                    </li>
                </ul>
            </nav>
        </div>

        <div className="row">
         <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive" style={{overflow:'visible'}}>
                  {lead.isLoaded?
                    <Leadtable data={lead}/>
                    :"" 
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
       
        </>
    )
    
}
export default Listlead;

