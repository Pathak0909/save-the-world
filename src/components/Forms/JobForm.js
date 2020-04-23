import React,{useEfect,useState} from 'react';
import {useAlert} from 'react-alert';
import axios from 'axios';

const JobForm=()=>{
  const alert=useAlert();
  const initState={
    company:'',
    sector:'',
    company_description:'',
    role:'',
    city:'',
    hiring:'',
    job_link:'',
    point_of_contact:''    

  }   
  const [Data,setData]=useState(initState);
  const handleChange=(e)=>{
      
      //console.log(`Setting for ${e.target.id} with ${e.target.value}`);
      setData({
          ...Data,
          [e.target.id]:e.target.value
      })
      //console.log('details',Data)
  }
  const sendData=()=>{
    let i=1;
    axios.post('http://3.14.202.69:8000/add_talent_connect_role',{
                company_name:Data.company,
                description:Data.company_description,
                company_sector:Data.sector,
                job_role:Data.role,
                hiring_type:Data.hiring,
                city:Data.city,
                point_of_contact:Data.point_of_contact,
                job_link:Data.job_link,
                is_job_open:i,
                createdAt:new Date(),
                updatedAt:new Date()
      

    })
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
  }
  const validate=()=>{
    let isEmpty=false;
    let error=false;
    console.log('Details: ',Data);
    Object.values(Data).forEach(val=>{
      if(val==''){
        isEmpty=true;
        error=true;
      }

    })
   
    return error;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    //document.querySelector('form').reset();
    if(!validate()){
    console.log('sending data');
    //sendData();
    document.querySelector('form').reset();
    alert.success('Job Posting added! Please refresh page to see updates.');
    return;
    }
    else{
      alert.error('Please fill all the fields first!');
      return;
    }
  }
    return(
        <div className="job-form">
        <h6 className="text-bold-extra left">Job Posting</h6>
      <p className="left">Fill out your details (all fields are required for submission). If you have multiple 
        postings you would like to add 
        you can fill out the csv template file here and email to katie@torchcapital.vc</p>
    <div className="row">
        <form className="col s12" class="job-form" onChange={handleChange}>
          <div className="row">
            <div className="input-field col s6">
              <input  id="company" type="text" required="" aria-required="true" className="validate" />
              <label data-error="wrong" data-success="right" htmlFor="company">Company</label>
              {/* <span class="helper-text" data-error="wrong" data-success="right">Please fill this field</span> */}
            </div>
            <div className="input-field col s6">
              <input id="sector" type="text" required="" aria-required="true" className="validate" />
              <label data-error="wrong" data-success="right"  htmlFor="sector">Sector</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input  id="company_description" required="" aria-required="true" type="text" className="validate" />
              <label data-error="wrong" data-success="right"  htmlFor="company_description">Company Description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input id="role" type="text" required="" aria-required="true" className="validate" />
              <label data-error="wrong" data-success="right" htmlFor="role">Role</label>
            </div>
            <div className="input-field inline col s6">
                <div className="row">
                  <div className="col m2">
                    <label><span>Hiring</span></label>
                  </div>
                </div>
              <div className="col s12 m5">
                 
              <label>
                  <input name="group1" id="hiring" type="radio" value="INTERN"/>
                  <span>Intern</span>
              </label>
              </div>
             <div className="col s12 m5 ">
             <label>
                  <input name="group1" id="hiring" type="radio" value="FULL_TIME"/>
                  <span>Full-Time</span>
             </label>
             </div>
              
              </div>
            <div className="input-field col s6">
              <input id="city" type="text" required="" aria-required="true" className="validate" />
              <label htmlFor="city">City</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input  id="job_link" type="url" required="" aria-required="true" className="validate" />
              <label htmlFor="job_link">Job Posting Link</label>
            </div>
            <div className="input-field col s6">
              <input  id="point_of_contact" required="" aria-required="true" type="text" className="validate" />
              <label htmlFor=" point_of_contact">Point of Contact</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a onClick={handleSubmit} class="modal-close waves-effect waves-green btn">Submit</a>
    </div>
        </div>
    )
}

export default JobForm;