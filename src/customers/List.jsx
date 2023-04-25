import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {Allcustomers} from "../store/customer/customerSlice"
import Customertable from "./Customertable"

const List=()=>{
    const dispatch = useDispatch();
    const {loading,isLoaded,customers,customer }=useSelector(state=>state.customer)
    useEffect(()=>{
        if(!isLoaded){
            dispatch(Allcustomers())
        }
    },[])
    return(
        <>
        <div className="page-header">
                <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-filter"></i>
                </span> Customer List 
                </h3>
                <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link  to="/customers/add">New Customer </Link>
                        </li>
                    </ul>
                </nav>
        </div>
        <div className="row">
         <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive" style={{overflow:'visible'}}>
              {isLoaded?
                    <Customertable data={customers}/>
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
export default List;