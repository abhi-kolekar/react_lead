import { useState } from "react";
import { Outlet } from "react-router-dom";
import Pageheader from "../components/Pageheader";
const Leads=()=>{
    //role and permission checked here
    const [user, serUser] = useState([])
    return(
        <>
            
            <Outlet context={[user]}/>
        </>
    )
    
}
export default Leads;


