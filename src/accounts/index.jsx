
import { Routes,Route } from "react-router-dom";
import Accountlayout from "./Accountlayout";
const Accounts=()=>{
    return(
    <>
        <Routes>
            <Route path="/" elements={<Accountlayout />}>
                <Route index element={<h1>Accounts Dashboard</h1>}></Route>

                 <Route path="transactions" element={<h1>List Transactions</h1>}></Route>
                 <Route path="transactions/add" element={<h1>Add Transactions</h1>}></Route>
                 <Route path="transactions/:id" element={<h1>View Transaction</h1>}></Route>

            </Route>
        </Routes>
    </>
    )
}
export default Accounts;