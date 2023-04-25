import {useEffect, useState} from 'react'
import { Link, useNavigate, redirect} from "react-router-dom"
import Pageheader from "../components/Pageheader";
import { storeLead } from '../services/leadService';
import { toast } from 'react-toastify';
import { Row,Col,Card,Form,Button,Table,Alert   } from "react-bootstrap";
const Addlead=()=>{
    const navigate = useNavigate();
    const [leadform,setLeadform]=useState({
        company:'',
        gst:'',
        date   :new Date(),
        status :'',
        address:'', 
    });

    const [enquiry,setEquiry]=useState(false)

    const [enquiryform, setEnquiryform]=useState({
        date   :new Date().toISOString().split('T')[0],
        enquiry_status :'',
        source :'',
        subject :'',
        details :'',
    });

    const [errors, setErrors]=useState({
        company:'',
        date   :'',
        gst :'',
        status :'',
        address:'',
        
        enquiry_status:'',
        source :'',
        subject:'',
        details:'',
        error :false
    });
    
    const [validated, setValidate]=useState(false);
    const [isRequired, setIsRequired]=useState(false);
    const [contactlist, setContactlist] = useState([{ name: "", mobile: "",email:"" }]);
    const [submitting, setSubmitting]=useState(false);

    function InputChange(e,i){
        const {name,value}=e.target;
        const list=[...contactlist];
        list[i][name] = value;
        setContactlist(list);
    }
    function addInput(){
        setContactlist((prev)=>[...prev,{ name: "", mobile: "",email:"" }])
    }
    function removeInput(i){
        //const list=contactlist;
        const list=[...contactlist];
        list.splice(i,1)
        setContactlist(()=>[...list])
    }

    function handleInput(e){
        console.log(e.target)
        const {name,value}=e.target;
        setLeadform({...leadform,[name]:value})
    }
    function handleInputenquiry(e){
        console.log(e.target)
        const {name,value}=e.target;
        setEnquiryform({...enquiryform,[name]:value})
    }
    function toggleEnquiry(){
        setEquiry(!enquiry)
        setIsRequired(!isRequired)
    }
    function submitform(e){
        e.preventDefault();
        if(submitting){
            return true;
        }
        const form = e.currentTarget;
        validateform();
        setValidate(true);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            
        }else{
            if(errors.error === false){
                    //api called
                    setSubmitting(true);
                    const response=toast.promise(
                            storeLead({lead:leadform,contact:contactlist,addenquiry:isRequired,enquiry:enquiryform,}),
                            {
                                pending: 'Lead is submitting',
                                success: 'Lead submit successfully',
                                error: 'Lead submitting failed'
                            }
                        )
                        response.then((response)=>{
                            //setSubmitting(false);
                            if(response.data.lead) {
                                navigate("/leads/"+response.data.lead);
                            }
                            


                        }).catch((error)=>{
                            setSubmitting(false);
                            console.log(error);
                        });
            }
        }

        
    }

    const validateform=()=>{
        const errorslist = {};
        let formIsValid = true;
        if(leadform.company.length < 5){
            errorslist.company="Name Required  Min. 5 Characters";
            formIsValid=false;
        }else{
            errorslist.company="";
        }

        if(leadform.status == ''){
            errorslist.status="Status Required";
            formIsValid=false;
        }else{
            errorslist.status="";
        }

        if(leadform.address.length < 5){
            errorslist.address="Address Required  Min. 5 Characters";
            formIsValid=false;
        }else{
            errorslist.address="";
        }

        contactlist.map((v,i)=>{
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(v.email)) {
                formIsValid = false;
            }
        })

        if(isRequired){
            if(enquiryform.subject.length < 5){
                errorslist.subject="Subject Required  min. 5 Characters";
                formIsValid=false;
            }else{
                errorslist.subject="";
            }
            if(enquiryform.details.length < 10){
                errorslist.details="Details Required min. 10 Characters";
                formIsValid=false;
            }else{
                errorslist.details="";
            }
        }

        if(formIsValid===false){
            errorslist.error=true;
        }else{
            errorslist.error=false;
        }
        setErrors({...errors, ...errorslist})
    }
    useEffect(()=>{
        console.log(submitting)
        console.log(errors)
    })
    return(
        <>
            <div className="page-header">
                <h3 className="page-title">
                <span className="page-title-icon bg-gradient-primary text-white mr-2">
                    <i className="mdi mdi-filter"></i>
                </span> Add Lead 
                </h3>
                <nav aria-label="breadcrumb">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link  to='/leads'>Leads</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add Lead
                        </li>
                    </ul>
                </nav>
            </div>
            <Row>
            <Col md={12} className="grid-margin stretch-card">
                <Card>
                    <Card.Body>
                        <Form noValidate validated={validated}  onSubmit={(e)=>submitform(e)}>
                            <Row>
                                <Form.Group as={Col } md={4} className="mb-3">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" name="company" value={leadform.company} minLength="5" placeholder="Company Name" size="sm" autoComplete='off' onChange={e=>handleInput(e)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">{(errors.company.length > 1) ? errors.company:"Please Enter Company Name"}</Form.Control.Feedback>
                                    
                                </Form.Group>
                                <Form.Group as={Col } md={4} className="mb-3">
                                    <Form.Label>GST:</Form.Label>
                                    <Form.Control type="text" name="gst" value={leadform.gst} placeholder="GST Number" size="sm" autoComplete='off' onChange={e=>handleInput(e)} ></Form.Control>
                                    <Form.Control.Feedback  type="invalid">Please Enter GST Number</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col } md={4} className="mb-3">
                                    <Form.Label>Status:</Form.Label>
                                    <Form.Select className="form-control form-control-sm" name="status" value={leadform.status} autoComplete='off' onChange={e=>handleInput(e)} required>
                                        <option value="">Please Select</option>
                                        <option value="BDM">BDM</option>
                                        <option value="CRM">CRM</option>
                                        <option value="Old CRM">Old CRM</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Blacklist">Blacklist</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Please Select Status</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col } md={8} className="mb-3">
                                    <Form.Label>Address:</Form.Label>
                                    <Form.Control as="textarea" name="address" value={leadform.address} minLength="5" placeholder="Company Address" rows={3} draggable="true" size="sm" autoComplete='off' onChange={e=>handleInput(e)} required></Form.Control>
                                    <Form.Control.Feedback type="invalid">{(errors.address.length > 1) ? errors.address:"Please Enter Company Address"}</Form.Control.Feedback>
                                </Form.Group>

   
                               
                                <div className="col-md-12">
                                    <p>Contact Details :</p>
                                    <div className="table-responsive">
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Contact No</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {contactlist.map((e,i)=>(
                                              <tr key={i}>
                                              <td>
                                              <Form.Group>
                                                <Form.Control type="text" name="name" size="sm"   autoComplete='off' onChange={e=>InputChange(e,i)} required/>
                                              </Form.Group>
                                              </td>
                                              <td>
                                              <Form.Group>
                                                <Form.Control type="text" name="mobile" size="sm"   autoComplete='off' onChange={e=>InputChange(e,i)} pattern="[0-9]{7,12}" required/>
                                              </Form.Group>
                                              </td>
                                              <td>
                                                <Form.Group>
                                                  <Form.Control type="email" name="email" size="sm"   autoComplete='off' onChange={e=>InputChange(e,i)} required/>
                                                </Form.Group>
                                              </td>
                                              <td>
                                              {contactlist.length !== 1 && 
                                                  <Button className="btn btn-sm btn-gradient-danger mr-2" onClick={()=>removeInput(i)}>
                                                    <i className="mdi mdi-minus"></i>
                                                  </Button>
                                                  }
                                                {contactlist.length - 1 === i && 
                                                  <Button className="btn btn-sm btn-gradient-primary mr-2" onClick={addInput}>
                                                  <i className="mdi mdi-plus"></i>
                                                  </Button>
                                                }
                                              </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    </div>                          
                                </div>
                                <div className="col-md-12">
                                    <hr/>
                                    <div className="row">
                                        <Form.Group className="mb-3 ml-3"  as={Col } md={4}>
                                            <Form.Check  type="checkbox" onClick={toggleEnquiry}/>Add  Enquiry
                                        </Form.Group>       
                                    </div>
                                    {enquiry &&(
                                       <>
                                       <Alert  variant="success" >  Enquiry Details : </Alert>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Date:</Form.Label>
                                                    <Form.Control type="date" name="date" value={enquiryform.date} size="sm" autoComplete='off'  onChange={e=>handleInputenquiry(e)} required={isRequired}></Form.Control>
                                                    <Form.Control.Feedback type="invalid"> Please Select date</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-4">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Source:</Form.Label>
                                                    <Form.Select className="form-control form-control-sm" name="source" value={enquiryform.source} autoComplete='off' onChange={e=>handleInputenquiry(e)} required={isRequired}>
                                                        <option value="">Please Select</option>
                                                        <option value="Mail">Mail</option>
                                                        <option value="Phone">Phone</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">Please Select source</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-4">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Status:</Form.Label>
                                                    <Form.Select className="form-control form-control-sm" name="enquiry_status" value={enquiryform.enquiry_status} autoComplete='off' onChange={e=>handleInputenquiry(e)} required={isRequired}>
                                                        <option value="">Please Select</option>
                                                        <option  value="Open">Open</option>
                                                        <option  value="Contacted">Contacted</option>
                                                        <option  value="Qualified">Qualified</option>
                                                        <option  value="Unqualified">Unqualified</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">Please Select Status</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-12">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Enquiry Subject :</Form.Label>
                                                    <Form.Control type="text" size="sm" name="subject" value={enquiryform.subject} minLength="5" autoComplete='off' placeholder="Subject" onChange={e=>handleInputenquiry(e)} required={isRequired} />
                                                <Form.Control.Feedback type="invalid"> {(errors.subject.length > 1) ? errors.subject:"Please Enter subject"}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-12">
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Enquiry Details :</Form.Label>
                                                    <Form.Control as="textarea"  rows={3} name="details" value={enquiryform.details} minLength="10" placeholder="Enquiry details" onChange={e=>handleInputenquiry(e)} required={isRequired}/>
                                                    <Form.Control.Feedback type="invalid"> {(errors.details.length > 1) ? errors.details:"Please Enter details"}</Form.Control.Feedback>
                                                </Form.Group>
                                            </div>
                                        </div>
                                       </>     
                                    )}
                                    
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-gradient-primary mr-2">Submit</button>
                                </div>
                                
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </>
    )
    
}
export default Addlead;