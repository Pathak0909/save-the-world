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
          <a href="#" class="brand-logo left">
             <img src="https://getwork.org/wp-content/uploads/2019/12/getwork_new.png" width="57px" alt="Jobs &amp; Internships for College Students | GetWork"/>
  
          </a>
            <ul className="hide-on-med-and-down right">
               <li><Link  to="/">Home</Link></li>
              <li><Link  to="/browse/talent">Browse Talent</Link></li>
              <li><Link  to="/browse/roles">Browse Opportunities</Link></li>
            </ul>
            <ul id="nav-mobile" className="sidenav black-text">
              <li><Link  to="/">Home</Link></li>
              <li><Link to="/browse/talent">Browse Talent</Link></li>
              <li><Link  to="/browse/roles">Browse Opportunities</Link></li>
            </ul>
            <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          </div>
        </nav>
        {/* <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Logo</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>
  </nav>
         */}
      </div>
       
    )
}

export default Navbar;