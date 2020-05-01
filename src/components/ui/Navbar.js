import React,{useEffect} from 'react';
import {Navlink, Link} from 'react-router-dom';
import M from 'materialize-css';

const Navbar=()=>{
  useEffect(()=>{
    var elems = document.querySelectorAll('.sidenav');
   M.Sidenav.init(elems, {});        
})
    return(
      <div className="navbar">
      <nav className="" role="navigation">
          <div className="nav-wrapper container">
          <a href="#" data-target="nav-mobile" className="sidenav-trigger right"><i className="material-icons">menu</i></a>

          <Link to="/" class="brand-logo left">
             <img src="https://getwork.org/wp-content/uploads/2019/12/getwork_new.png" width="57px" alt="Jobs &amp; Internships for College Students | GetWork"/>
  
          </Link>
            <ul className="hide-on-med-and-down right">
               <li><Link  to="/">Home</Link></li>
              <li><Link  to="/talent">Browse Talent</Link></li>
              <li><Link  to="/roles">Browse Opportunities</Link></li>
            </ul>
            <ul id="nav-mobile" className="sidenav black-text">
              <li><Link class="sidenav-close" to="/">Home</Link></li>
              <li><Link class="sidenav-close" to="/talent">Browse Talent</Link></li>
              <li><Link  class="sidenav-close" to="/roles">Browse Opportunities</Link></li>
            </ul>
          </div>
        </nav>
       
      </div>
       
    )
}

export default Navbar;