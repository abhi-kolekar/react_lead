import { Route, Routes, Outlet } from "react-router-dom";
import Customerlayout from "./Customerlayout";
import List from "./List";
const Customers=()=>{

    return(
        <>
          <Routes>
                <Route path="/" element={<Customerlayout />}>
                    <Route index element={<List />}></Route>
                    <Route path="add" element={<h1>add Customers</h1>}></Route>  
                </Route> 
          </Routes>
        </>
    )
    
}
export default Customers;