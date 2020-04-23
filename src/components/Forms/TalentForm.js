import React,{useEfect, useState} from 'react';
import {useAlert} from 'react-alert';
import axios from 'axios';

const TalentForm=()=>{
  const alert=useAlert();
  const initState={
    name:'',
    status:'',
    college_name:'',
    company_name:'',
    specialization:'',
    sector:'',
    role:'',
    location:'',
    open_to_relocating:'No',
    resume_url:'',
    email:'',
    phone:''
  }
    const [Data,setData]=useState(initState);
    const handleChange=(e)=>{
      //console.log('here inside handle change');
      setData({
        ...Data,
        [e.target.id]:e.target.value
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
      alert.success('Profile added! Please refresh page to see updates');
      return;
      }
      else{
        alert.error('Please fill all the fields first!');
        return;
      }
    }
    const sendData=()=>{
      axios.post('http://3.14.202.69:8000/add_talent_profile',{
          name:Data.name,
          is_student:Data.status=='student'?1:0,
          college_name:Data.college_name,
          specialization:Data.specialization,
          company_sector:Data.sector,
          company_name:Data.company_name,
          company_sector:Data.sector,
          role:Data.role,
          city:Data.location,
          is_relocation:Data.open_to_relocating=="Yes"?1:0,
          linkedin_url:Data.resume_url,
          email:Data.email,
          phone:Data.phone

      })
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })


          

  
  }
    return(
        <div className="talent-form">
        <h6 className="text-bold-extra left">Add your details
      
      </h6>
  
        <p className="left"> &nbsp; (All fields are mandatory)</p>
      <div className="row">
        
          <form className="col s12" onChange={handleChange}>
            <div className="row">
              <div className="input-field inline col s6">
                <input  id="name" type="text" className="validate" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field inline col s6">
                <div className="row">
                  <div className="col m2">
                    <label><h6>Currently</h6></label>
                  </div>
                </div>
              <div className="col s12 m5">
                 
              <label>
                  <input id="status" name="group1" type="radio" value="working" className="validate"/>
                  <span>Working</span>
              </label>
              </div>
             <div className="col s12 m5 ">
             <label>
                  <input  id="status" name="group1" type="radio" value="student" className="validate"/>
                  <span>Student</span>
             </label>
             </div>
              
              </div>
            </div>
            <div className="row">
              <div className="input-field inline col s6">
                <input  id="college_name" type="text" className="validate" />
                <label htmlFor="college_name">College Name</label>
              </div>
              <div className="input-field inline col s6">
                <input  id="company_name" type="text" className="validate" />
                <label htmlFor="company_name">Company Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="specialization" type="text" className="validate" />
                <label htmlFor="specialization">Specialization</label>
              </div>
              <div className="input-field col s6">
                <input id="sector" type="text" className="validate" />
                <label htmlFor="sector">Sector</label>
              </div>
            
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input  id="role" type="url" className="validate" />
                <label htmlFor="role">Job Posting Link</label>
              </div>
           
              <div className="input-field col s12 m6">
                <input  id="location" type="text" className="validate" />
                <label htmlFor="location">Location</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
              <label>
                  <input id="open_to_relocating" type="checkbox" class="filled-in" value="Yes" className="validate"/>
                  <span>Open to relocating?</span>
              </label>
                
              </div>
           
              <div className="input-field col s6">
                      <div class="file-field input-field">
                      <div class="btn">
                          <span>LinkedIn URL/Resume</span>
                          <input type="file" id="resume_url"/>
                      </div>
                      <div class="file-path-wrapper">
                          <input class="file-path validate" type="text" onChange={handleChange}/>
                      </div>
                  </div>
             
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input  id="email" type="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
           
              <div className="input-field col s6">
                <input  id="phone" type="number" className="validate" />
                <label htmlFor="phone">Phone No.</label>
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

export default TalentForm;