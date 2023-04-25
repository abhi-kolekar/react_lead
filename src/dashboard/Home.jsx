import Pageheader from "../components/Pageheader";
import { Link } from "react-router-dom";
const Home=()=>{
    return (
        <>
            <Pageheader />
            <div className="row">
                <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-danger card-img-holder text-white">
                    <div className="card-body text-left">
                    <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Total Enquiries <i className="mdi mdi-filter mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">10</h2>
                        <Link  to="/leads">
                        <h6 className="card-text">View More .....</h6>
                        </Link>
                    </div>
                </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-info card-img-holder text-white">
                    <div className="card-body text-left">
                    <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Total Customers <i className="mdi mdi-account mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">10</h2>
                        <Link to="/quotations">
                            <h6 className="card-text">View More .....</h6>
                        </Link>
                    </div>
                </div>
                </div>
                <div className="col-md-4 stretch-card grid-margin">
                <div className="card bg-gradient-success card-img-holder text-white">
                    <div className="card-body text-left">
                    <img src={require("../assets/images/dashboard/circle.svg").default} className="card-img-absolute" alt="circle" />
                    <h4 className="font-weight-normal mb-3">Total Quotations <i className="mdi mdi-calendar mdi-24px float-right"></i>
                    </h4>
                    <h2 className="mb-5">10</h2>
                        <Link  to="/quotations">
                        <h6 className="card-text">View More .....</h6>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">To Do List</h4>
                            
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-6 stretch-card grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4>Todays Reminder</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 stretch-card grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4>Recent Updates</h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 stretch-card grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4>Recent Notifications</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Todays Leads Activity</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                    
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default Home;