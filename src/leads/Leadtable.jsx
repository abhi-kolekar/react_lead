import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom"
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
const tableHead = {
    id: "Id",
    name: "Company Name",
    email: "Email",
    mobile: "Phone",
    status: "Status",
    action: "Actions"
};
const Leadtable=({data})=>{
    const navigate =useNavigate();
    const countPerPage = 5;
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [collection, setCollection] = useState([])
    

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(data.leads.slice(from, to));
    };
    const handleClick=(event,id)=>{
        if(event.detail===2){
            navigate(`${id}`)
        }
    }
    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {

            //key.id
          if(keyD==='id'){
            return (<>
                <td key={i} onClick={(e)=>handleClick(e,key.id)}>
                    {key[keyD]}
                </td>
            </>);
          }
          return <td key={i}>{key[keyD]}</td>;
        });
    
        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        // return all values(not key) from json object in to array 
        return Object.values(tableHead).map((title, index) => (
          <td key={index}>{title}</td>
        ));
    };

    useEffect(()=>{
        let list=data.leads.slice(0,countPerPage)
        setCollection(list)
    },[])
    
    const searchData = useRef(
        throttle(val => {
          const query = val.toLowerCase();
          setCurrentPage(1);
          const leaddata = cloneDeep(
            data.leads
              .filter(item => item.name.toLowerCase().indexOf(query) > -1)
              .slice(0, countPerPage)
          );
          setCollection(leaddata);
        }, 400)
    );

    useEffect(()=>{
        if (!value) {
            updatePage(1);
        }else{
            searchData.current(value);
        }
    },[value])
    return(
        <>
        <div className="row">
            <div className="col-md-6">

                <div className="d-flex align-items-center">
                    <p className="mb-2 mr-2">Search in table:</p>
                    <label htmlFor="search-bar-0" className="search-label">
                        <span  className="sr-only">Search Lead</span>
                        <input type="text"  value={value} onChange={e => setValue(e.target.value)} className="form-control" style={{borderRadius: "2px"}} placeholder="Search" />
                    </label>
                </div>
            
            </div>
            <div className="col-md-6 text-right">
                <Pagination
                    pageSize={countPerPage}
                    onChange={updatePage}
                    current={currentPage}
                    total={data.leads.length}
                />
            </div>
        </div>
        <table className="table table-striped table-bordered" >
            <thead>
            <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
        </table>
         <p assName="mt-3">Total Data: {data.leads.length}</p>
        </>
    )
}
export default Leadtable;


const Pagination=({pageSize,onChange,current,total})=>{
    console.log(total)
    return (
        <>
        <ul className="pagination">
            <li className="page-item"><a className="page-link" onClick={()=>onChange(current - 1)}>Previous</a></li>
            <li className="page-item"><a className="page-link" onClick={()=>onChange(current + 1)}>Next</a></li>
        </ul>
        </>
    )
}