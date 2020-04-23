import React,{useEffect} from 'react';
import './Main.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import Footer from '../ui/Footer';
import TalentForm from '../Forms/TalentForm';
import JobForm from '../Forms/JobForm';

const Main=()=>{
  useEffect(()=>{
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
           
})
    return(
        <div className="main">
     
        <div id="index-banner" className="container">
         
        
          <div class="row">
              <div class="col s12 m12">
                <div class="main-text">
                 <h2 className="text-bold-extra">GetWork's Covid 19 Initiative</h2>
                  <br/>
                 <h4 className="text-bold">We're connecting talent affected by layoffs due to Coronavirus, with employers looking to hire.</h4>
                  <br/>

                </div>
              </div>
      </div>
        </div>
        <br/>
            <div class="row container">
        <div class="col s12 m6 btn-box-roles container left">
          <div className="row title-container">
          <span class="btn-title text-center">For Employers</span>
          </div>
          <div className="row">
            <div className="col s12 m5 btn-box">
            <a class="modal-trigger big-btn btn" href="#job-post">
              <span class="main-btn-text">POST A JOB</span>
              </a>
            </div>
            <div className="col s12 m5 btn-box">
            <Link to="/browse/talent" className="big-btn btn" >
            <span class="main-btn-text">BROWSE TALENT</span>
            </Link>
            </div>
          </div>
        
        </div>
        <div class="col s12 m6 btn-box-talent container right">
          <div className="row">
          <span class="btn-title text-center title-container">For Talent</span>
          </div>
          <div className="row">
            <div className="col s12 m5 btn-box">
            <a href="#add-talent" className="modal-trigger big-btn btn">
              <span class="main-btn-text">ADD YOURSELF</span>
              </a>
            </div>
            <div className="col s12 m5 btn-box">
            <Link to="/browse/roles" className="big-btn btn" >
              <span class="main-btn-text">BROWSE ROLES</span>
            </Link>
            </div>
          </div>
        
        </div>
     
      </div>  
                
  <div id="job-post" class="modal">
    <div class="modal-content job-modal">
      <JobForm></JobForm>
     
    </div>
    {/* <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
    </div> */}
  </div>

  <div id="add-talent" class="modal">
    <div class="modal-content talent-modal">
      <TalentForm></TalentForm>
   
    </div>
  
    {/* <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Submit</a>
    </div> */}
  </div>
              <div className="container pref-footer">
              <h6>
              This is a free resource for everyone. Any questions, comments, or collaboration opportunities please 
              send us an email. Please share this platform with those who can benefit.
              </h6>
              </div>
              
            <div className="social-icons container row">
              {/* <p>Connect with us to know more</p> */}
              <ul>
              <li><a href="" class="btn-floating btn-small  light-blue accent-3" data-tooltip="Instragram">
                    <i class="fab fa-instagram"></i>
                </a></li>
                <li><a href="" class=" btn-floating btn-small  light-blue accent-3" data-tooltip="Facebook">
                        <i class="fab fa-facebook"></i>
                    </a></li>
                <li><a href="" class=" btn-floating btn-small  light-blue accent-3" data-tooltip="Twitter">
                    <i class="fab fa-twitter"></i>
                </a></li>
              </ul>
           
            </div>
        </div>
        
    )
}

export default Main;