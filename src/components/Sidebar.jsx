import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { useSelector } from 'react-redux';



const Sidebar=(props)=>{
      const {userInfo}= useSelector((state) => state.auth);
      const location=useLocation();
      function isPathActive(path) {
            
            //console.log(location)
            //return path;
            return location.pathname.startsWith(path);
            //return props.location.pathname.startsWith(path);
      }
        
  return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                  <li className="nav-item nav-profile">
                        <a href="!#" className="nav-link" onClick={evt =>evt.preventDefault()}>
                              <div className="nav-profile-image">
                                    <img src={ require("../assets/images/faces/face1.jpg") } alt="profile" />
                                    <span className="login-status online"></span> {/* change to offline or busy as needed */}
                              </div>
                              <div className="nav-profile-text">
                                    <span className="font-weight-bold  d-block mb-2"><Trans>{userInfo.name}</Trans></span>
                                    <span className="text-secondary text-small"><Trans>{userInfo.usertype}</Trans></span>
                              </div>
                              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                  </li>
                  <li className={ isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/">
                        <span className="menu-title"><Trans>Dashboard</Trans></span>
                        <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/leads') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/leads">
                        <span className="menu-title"><Trans>Lead</Trans></span>
                        <i className="mdi mdi-filter menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/customers') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/customers">
                        <span className="menu-title"><Trans>Customers</Trans></span>
                        <i className="mdi mdi-account-multiple menu-icon"></i>
                        </Link>
                  </li>
                  
                  <li className={ isPathActive('/sales') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/sales">
                        <span className="menu-title"><Trans>Sales</Trans></span>
                        <i className="mdi mdi-chart-bar menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/purchase') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/purchase">
                        <span className="menu-title"><Trans>Purchase</Trans></span>
                        <i className="mdi mdi-chart-bar menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/accounts') ?'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/accounts">
                        <span className="menu-title"><Trans>Accounts</Trans></span>
                        <i className="mdi mdi-chart-bar menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/inventory') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/inventory">
                        <span className="menu-title"><Trans>Inventory</Trans></span>
                        <i className="mdi mdi-dropbox menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/calendar') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/calendar">
                        <span className="menu-title"><Trans>Calendar</Trans></span>
                        <i className="mdi mdi-calendar menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/report') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/report">
                        <span className="menu-title"><Trans>Report</Trans></span>
                        <i className="mdi mdi-chart-bar menu-icon"></i>
                        </Link>
                  </li>
                  <li className={ isPathActive('/setting') ? 'nav-item active' : 'nav-item' }>
                        <Link className="nav-link" to="/setting">
                        <span className="menu-title"><Trans>Setting</Trans></span>
                        <i className="mdi mdi-settings menu-icon"></i>
                        </Link>
                  </li>
            </ul>
      </nav>
   );


}
export default Sidebar;
//export default withRouter(Sidebar);
//export default withRouter(React.memo(Sidebar));

const Trans=({children}) => {
      return children;
  }