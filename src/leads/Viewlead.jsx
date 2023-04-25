import { useParams,Link } from "react-router-dom";
import {Form, Dropdown, Button, Modal,Col, Row, Nav, Tabs, Tab } from 'react-bootstrap';
import Pageheader from "../components/Pageheader";
const Viewlead=()=>{
    let params=useParams();
    console.log(params)
    return(
        <>
        <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white mr-2">
                <i className="mdi mdi-filter"></i>
              </span> Leads - 
            </h3>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/'>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    Lead
                    </li>
                </ul>
            </nav>
        </div>
        <div className="row sts">
        <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <div className="tab-pills-horizontal">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Nav variant="pills" className="flex-column">
                                      <Nav.Item>
                                        <Nav.Link eventKey="first" className="d-flex align-items-center">
                                          Profile
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="second" className="d-flex align-items-center">
                                          Activity Log
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="fourth" className="d-flex align-items-center">
                                         Proposal
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="fifth" className="d-flex align-items-center">
                                         Email
                                        </Nav.Link>
                                      </Nav.Item>
                                      <Nav.Item>
                                        <Nav.Link eventKey="third" className="d-flex align-items-center">
                                          Reminder
                                        </Nav.Link>
                                      </Nav.Item>
                                    </Nav>
                                </div>
                                <div className='col-md-12'>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first" >
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second" >
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="first" >
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                            </div>
                    </Tab.Container>
                    </div>
                </div>
            </div>
        </div>
         </div>

        
        </>
    )
    
}
export default Viewlead;