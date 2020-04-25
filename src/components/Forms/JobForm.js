import React,{useEffect,useState} from 'react';
import {useAlert} from 'react-alert';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import M from 'materialize-css';

import './JobForm.css';
const JobForm=()=>{
  const history=useHistory();
  const { register, watch, errors } = useForm();
  const [disableBtn,setDisableBtn]=useState('disabled');
  const alert=useAlert();
  useEffect(()=>{
    // var modal = document.querySelectorAll('.modal');
    // M.Modal.init(modal, {});
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});
    var dropdwn = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdwn, {});
  })
  const initState={
    company:'',
    sector:'',
    company_description:'',
    role:'',
    city:'',
    hiring:'',
    job_link:'',
    point_of_contact:'',


  }   
  const [Data,setData]=useState(initState);
  const handleChange=(e)=>{
      
      //console.log(`Setting for ${e.target.id} with ${e.target.value}`);
      setData({
          ...Data,
          [e.target.id]:e.target.value
      })
      //console.log('details',Data)
      if(!validate())
      setDisableBtn('');

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
    console.log('sending data: ',Data);
    
    sendData();
    document.querySelector('form').reset();
    setTimeout(()=>{
      if(history.location.pathname=='/')
      history.push('/browse/roles')
      else
      window.location.reload(true);
    },3000);
    alert.success('Job added successfully!');
    return;
    }
    else{
      alert.error('Please fill all the fields first!');
      document.querySelector('.error-msg').classList.remove('hide');
      return;
    }
  }
    return(
        <div className="job-form">
          <div className="row">
          <h6 className="text-bold-extra left">Job Posting</h6>
          </div>
       <div className="row form-desc-box">
       <p className="">Fill out your details (all fields are required for submission). 
        If you have multiple postings you would like to add you can fill out the csv template file 
        here and email to khushboo@getwork.org
    </p>
       </div>
     
    <div className="row">
        <form className="col s12" class="job-form" onChange={handleChange}>
          <div className="row">
            <div className="input-field col s6">
              <input  id="company" type="text" name="company" required="" aria-required="true" className="validate"
              maxLength="50"
              ref={register({ required: true})}
               />
              <label data-error="wrong" data-success="right" htmlFor="company">Company</label>
              {/* <span class="helper-text" data-error="wrong" data-success="right">Please fill this field</span> */}
            </div>
            <div className="input-field col s6">
            <input id="sector" type="text" className="validate" maxLength="50" />
                <label htmlFor="sector">Sector</label>
            
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input  id="company_description" required="" aria-required="true" type="text" className="validate" maxLength="150" />
              <label data-error="wrong" data-success="right"  htmlFor="company_description">Company Description (Max 150 characters)</label>
            </div>
          </div>
          <div className="row hiring-box">
            
            <div className="input-field inline col s12 ">
                <div className="row">
                  <div className="col m2 s2">
                    <label><span className="lg-text">Hiring for:</span></label>
                  </div>
                
              <div className="col s5 m2">
                 
              <label>
                  <input name="group1" id="hiring" type="radio" value="INTERN"/>
                  <span>Internship</span>
              </label>
              </div>
             <div className="col s5 m3 ">
             <label>
                  <input name="group1" id="hiring" type="radio" value="FULL_TIME"/>
                  <span>Full-Time</span>
             </label>
             </div>
              </div>
              </div>
              </div>
              <div className="row">
              <div className="input-field col s6">
              <select className="browser-default" id="role" type="text" className="validate"
              onSelect={(e)=>{console.log(e)}}
              >
              <option value="" disabled selected>Role</option>
              <option value="BD/Sales/Marketing">BD/Sales/Marketing</option>
              <option value="Engineering/Product/Design">Engineering/Product/Design</option>
              <option value="Finance/Ops/Analytics">Finance/Ops/Analytics</option>
              <option value="Retail Services">Retail Services</option>
              <option value="Other">Other</option>
            </select>
              {/* <input id="role" type="text" required="" aria-required="true" className="validate" />
              <label data-error="wrong" data-success="right" htmlFor="role">Role/Title</label> */}
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
              <label htmlFor=" point_of_contact">Contact Email</label>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
    

      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a onClick={handleSubmit} class={`modal-close waves-effect waves-green btn ${disableBtn}`}>Submit</a>
    </div>
        </div>
    )
}

export default JobForm;