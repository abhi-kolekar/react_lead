import { Routes,Route } from "react-router-dom";
import Salelayout from "./Salelayout";

const Sales=()=>{

    return(
        <>
        <Routes>
            <Route path="/" element={<Salelayout />}>
                <Route index element={<h1>Sales Dashboard</h1>}></Route>

                <Route path="qotations" element={<h1>Qotations</h1>}></Route>
                <Route path="qotations/add" element={<h1>Add Qotations</h1>}></Route>
                <Route path="qotations/:id" element={<h1>View Qotations</h1>}></Route>
                <Route path="qotations/:id/edit" element={<h1>Edit Qotations</h1>}></Route>

                <Route path="proforma" element={<h1>Proforma</h1>}></Route>
                <Route path="proforma/add" element={<h1>Add Proforma</h1>}></Route>
                <Route path="proforma/:id" element={<h1>View Proforma</h1>}></Route>
                <Route path="proforma/:id/edit" element={<h1>Edit Proforma</h1>}></Route>

                <Route path="invoice" element={<h1>Invoice</h1>}></Route>
                <Route path="invoice/add" element={<h1>Add Invoice</h1>}></Route>
                <Route path="invoice/:id" element={<h1>View Invoice</h1>}></Route>
                <Route path="invoice/edit" element={<h1>Edit Invoice</h1>}></Route>

                <Route path="pos" element={<h1>Pos</h1>}></Route>
            </Route>
        </Routes>
        </>
    )
}
export default Sales;