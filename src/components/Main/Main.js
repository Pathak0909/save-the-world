import React,{useEffect} from 'react';
import './Main.css';
import M from 'materialize-css';
import {Link} from 'react-router-dom';
import TalentForm from '../Forms/TalentForm';
import JobForm from '../Forms/JobForm';
import Sharing from 'react-sharing';



const Main=()=>{
  const url='http://unlocktalenttest.getwork.org';
  useEffect(()=>{
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals, {});
    var selects = document.querySelectorAll('select');
      M.FormSelect.init(selects, {});
   var dropdwn = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(dropdwn, {});
           
})
    return(
        <div className="main">
     
        <div id="index-banner" className="container">
         
        
          <div class="row">
              <div class="col s12 m12">
                <div class="main-text">
                 <h2 className="">GetWork's Covid 19 Initiative</h2>
                  <br/>
                 <h4 className="">We're connecting talent affected by layoffs due to Coronavirus, with employers looking to hire.</h4>
                  <br/>

                </div>
              </div>
      </div>
        </div>
        <br/>
            <div class="row box-container container">
        <div class="col s12 m6 btn-box-roles container left">
          <div className="row title-container">
          <span class="btn-title text-center title-container">For Employers:</span>
          </div>
          <div className="row">
            <div className="col s12 m5 btn-box">
            <a class="modal-trigger big-btn btn" href="#job-post">
              <span class="main-btn-text">POST A JOB</span>
              </a>
            </div>
            <div className="col s12 m5 btn-box">
            <Link to="/talent" className="big-btn btn" >
            <span class="main-btn-text">BROWSE TALENT</span>
            </Link>
            </div>
          </div>
        
        </div>
        <div class="col s12 m6 btn-box-talent container right">
          <div className="row title-container">
          <span class="btn-title text-center ">For Talent:</span>
          </div>
          <div className="row">
            <div className="col s12 m5 btn-box">
            <a href="#add-talent" className="modal-trigger big-btn btn">
              <span class="main-btn-text">ADD YOURSELF</span>
              </a>
            </div>
            <div className="col s12 m5 btn-box">
            <Link to="/roles" className="big-btn btn" >
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
  
  </div>

  <div id="add-talent" class="modal">
    <div class="modal-content talent-modal">
      <TalentForm></TalentForm>
   
    </div>
  
 
  </div>
              <div className="container pref-footer">
              <h6>
              This is a free resource for everyone. Any questions, comments, or collaboration opportunities please 
             <u>
             <a class="email-text black-text" href="mailto:team@getwork.org?subject=Unlock Talent Connect Inquiry"> send us an email</a>
               </u> 
              . Please share this platform with those who can benefit.
              </h6>
              </div>
              
        
          <div className="sharers">
          <Sharing
                  sites = {[ "facebook","twitter",'linkedin' ]}
                  url = 'http://unlocktalent.getwork.org'
                  title = "GetWork has created a resource connecting talent affected by 
                  layoffs due to Coronavirus, with employers looking to hire. During this challenging time,
                   please share with individuals and companies in our incredible community who can benefit. 
                   https://unlocktalent.getwork.org/"
                  description = "GetWork has created a resource connecting talent affected by 
                  layoffs due to Coronavirus, with employers looking to hire. During this challenging time,
                   please share with individuals and companies in our incredible community who can benefit. 
                   https://unlocktalent.getwork.org/"
                />
          </div>
          

        </div>
        
    )
}

export default Main;