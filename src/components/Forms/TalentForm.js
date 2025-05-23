import React,{useEffect, useState} from 'react';
import './TalentForm.css';
import {useAlert} from 'react-alert';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const TalentForm=(props)=>{
  //console.log(props.addNewData);
  // let [phoneNo,setPhoneNo]=useState(null);
  // const phoneRegex=/^[789]\d{9}$/
  const history=useHistory();
  const alert=useAlert();
  const [disableBtn,setDisableBtn]=useState('disabled');
  useEffect(()=>{
    // var elems = document.querySelectorAll('.modal');
    // M.Modal.init(elems, {});
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});
    var dropdwn = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdwn, {});
  })
 
  const initState={
    name:'',
    is_student:1,
    college_name:'-',
    company_name:'-',
    specialization:'-',
    company_sector:'',
    role:'-',
    city:'',
    is_relocation:0,
    resume_doc:null,
    linkedin_url:'',
    // resume_path:'',
    email:'',
    phone:''
  }
    const [Data,setData]=useState(initState);
  

    const handleChange=(e)=>{
      e.preventDefault();
      //console.log(`triggered for ${e.target.id}`);
     
      //setting the state for resume here
    //  setData({
    //    ...Data,
    //    resume_path:Data.phone
    //  })
     
     if(e.target.id=='is_student' || e.target.id=='is_relocattion' || e.target.id=='resume_doc'){
        if(e.target.id=='resume_doc'){
          const file=e.target.files[0];
          //console.log('files: ',file);
        
          
          setData({
            ...Data,
            [e.target.id]:file
          })
        
        }
        else 
        setData({
          ...Data,
            [e.target.id]:parseInt(e.target.value)
          })
      }
      else      
      setData({
        ...Data,
        [e.target.id]:e.target.value
      })
      console.log('Data: ',Data);
      if(!validate())
      setDisableBtn('');
      else
      setDisableBtn('disabled');
      
    }
    const validatePDF=()=>{
      if ( Data.resume_doc && Data.resume_doc.type === 'application/pdf' ) 
       return true;

    return false;
    }
    const validate=()=>{
      setDisableBtn('disabled')
      let isEmpty=false,phoneError=false;
      let error=true;
      //console.log('Details: ',Data);
      let notEmptyFields=['name','city','email','phone','college_name','specialization','company_sector']
      //validatePDF();
      let workingFields=[];
      if(Data.phone && Data.phone.length!=10)
      phoneError=true;
      if(!Data.is_student){
        //console.log('checking for working')
        if((Data.company_name=='' || Data.company_name=='-' )|| (Data.role=='' || Data.role=='-')){
          //console.log('found empty for working')
          isEmpty=true;
        }
      }
      for(let[key,value] of Object.entries(Data)){
       if(notEmptyFields.indexOf(key)>-1){
         if(value=='' || value=='-') isEmpty=true;
       }
      }
      if(!Data.resume_doc && !Data.linkedin_url){
      isEmpty=true;
        
       document.querySelector('.error-msg').classList.remove('hide');

     }
      if(Data.resume_doc || Data.linkedin_url){
        document.querySelector('.error-msg').classList.add('hide');

      }
     if(!isEmpty && !phoneError) error=false;
     if(error){
       setDisableBtn('disabled')
     }else{
       setDisableBtn('');
     }
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(Data.resume_doc && !validatePDF()){
        alert.error('Resume should be in pdf format');
      return;
      }
      //document.querySelector('form').reset();
      if(!validate()){
      //console.log('sending data: ',Data);
      //props.addNewData(Data);
      sendData();
      document.querySelector('form').reset();
      setTimeout(()=>{
        if(history.location.pathname=='/')
      history.push('/talent')
      else
        window.location.reload(true);
      },3000);
      alert.success('Profile added successfully!');
      return;
      }
      else{
        alert.error('Please fill all the fields correctly!');
        document.querySelector('.error-msg').classList.remove('hide');
        return;
      }
    }
    const sendData=()=>{
      // http://3.14.202.69:8000
      // setData({
      //   ...Data,
      //   resume_path:Data.name
      // })
     let formData=new FormData();
     const resumeName=Data.phone;
     //console.log('resume path: ',resumeName)
     if(Data.resume_doc)
     formData.append('resume_name',resumeName);

     for(let [key,value] of Object.entries(Data)){
       //console.log(typeof(value));
       formData.append(key,value);
     }
   
      //console.log('sending data:',formData); 
      axios.post('https://app.getwork.org:5000/add_talent_profile',
     formData
      // {
      //     createdAt:new Date(),
      //     name:Data.name,
      //     is_student:Data.status=='student'?1:0,
      //     college_name:Data.college_name,
      //     specialization:Data.specialization,
      //     company_sector:Data.sector,
      //     company_name:Data.company_name,
      //     company_sector:Data.sector,
      //     role:Data.role,
      //     city:Data.location,
      //     is_relocation:Data.open_to_relocating=="Yes"?1:0,
      //     resume_name:Data.name,
      //     linkedin_url:Data.linkedin_url,
      //     email:Data.email,
      //     phone:Data.phone

      // }
      )
        .then(res=>{
          console.log('res : ',res);

        })
        .catch(err=>{
          console.log(err);
        })


          

  
  }
    return(
        <div className="talent-form">
          <div className="row form-desc-box">
          <h6 className="text-bold-extra left">Add Yourself</h6>
          </div>
         
       <div className="row form-desc-box">
         
       <p className="left">(All fields are mandatory)
        </p>
    </div>
       
      <div className="row">
        
          <form className="col s12" onChange={handleChange} onFocus={validate} onBlur={validate} id="talentForm">
            {/* <div className="row hide-on-small-only">
              <div className="input-field inline col m6 s6">
              <select id="sector" type="text" className="validate">
              <option value="" disabled selected>Find Jobs In</option>
              <option value="BD/Sales/Marketing">BD/Sales/Marketing</option>
              <option value="Engineering/Product/Design">Engineering/Product/Design</option>
              <option value="Finance/Ops/Analytics">Finance/Ops/Analytics</option>
              <option value="Retail Services">Retail Services</option>
              <option value="Other">Other</option>
            </select>
             
              </div>
              <div className="input-field inline col m6 s6">
                <input  id="name" type="text" className="validate"  required="" aria-required="true"  />
                <label htmlFor="name">Name</label>
              </div>
              </div> */}
            <div className="row ">
              <div className="input-field inline col s12">
              <select id="company_sector" type="text" className="validate">
              <option value="" disabled selected>Find Jobs In</option>
              <option value="BD/Sales/Marketing">BD/Sales/Marketing</option>
              <option value="Engineering/Product/Design">Engineering/Product/Design</option>
              <option value="Finance/Ops/Analytics">Finance/Ops/Analytics</option>
              <option value="Retail Services">Retail Services</option>
              <option value="Other">Other</option>
            </select>
             
              </div>
              </div>
              <div className="row ">
              <div className="input-field inline col s12">
                <input  id="name" type="text" className="validate"  required="" aria-required="true" />
                <label htmlFor="name">Name</label>
              </div>
              </div>
              <div className="row hiring-box">
            
                    <div className="input-field inline col s12 ">
                        <div className="row">
                          <div className="col m2 s2">
                            <label><span className="lg-text">Currently:</span></label>
                          </div>
                        
                      <div className="col s5 m2">
                        
                      <label>
                      <input id="is_student" name="group1" type="radio" value="0" className="validate" />
                          <span>Working</span>
                      </label>
                      </div>
                    <div className="col s5 m3 ">
                    <label>
                    <input  id="is_student" name="group1" type="radio" value="1" className="validate"/>
                          <span>Studying</span>
                    </label>
                    </div>
                      </div>
                      </div>
              </div>
    
            <div className="row ">
              <div className="input-field inline col s6">
                <input  id="college_name" type="text" className="validate" maxLength="50" />
                <label htmlFor="college_name"> College Name</label>
              </div>
              <div className="input-field inline col s6">
              
                <input id="specialization" type="text" className="validate"  />
                <label htmlFor="specialization">Course & Branch</label>
           
                
              </div>
            </div>
            {/* <div className="show-on-small hide-on-med-and-up">
            <div className="row">
              <div className="input-field inline col s12">
                <input  id="college_name" type="text" className="validate"  maxLength="50"  />
                <label htmlFor="college_name">Current (or former) College Name</label>
              </div>
              </div>
              <div className="row">
              <div className="input-field inline col s12">
              
              <input id="specialization" type="text" className="validate"  />
              <label htmlFor="specialization">Course & Branch</label>
         
              
            </div>
              </div>
             
            </div> */}
            
            
            <div className="row ">
              <div className="input-field col s6">
              <input  id="company_name" type="text" className="validate"  maxLength="50" />
                <label htmlFor="company_name">Company Name</label>
              </div>
              <div className="input-field col s6">
                <input  id="role" type="text" className="validate" />
                <label htmlFor="role">Role</label>
              </div>
            </div>
            {/* <div className="show-on-small hide-on-med-and-up">
              <div className="row">
              <div className="input-field col s12">
              <input  id="company_name" type="text" className="validate"  maxLength="50"  required="" aria-required="true" />
                <label htmlFor="company_name">Current (or former) Company Name</label>
              </div>
              </div>
              <div className="row">
              <div className="input-field col s12 m6">
                <input  id="role" type="text" className="validate" />
                <label htmlFor="role">Role</label>
              </div>
              </div>
             
            </div> */}
            <div className="row">
             
           
              <div className="input-field col s6 m6">
                <input  id="city" type="text" className="validate"  required="" aria-required="true"/>
                <label htmlFor="location">City</label>
              </div>
            
           
              <div className="input-field col s6">
              <label>
                  <input id="is_relocation" type="checkbox" class="filled-in" value="1" className="validate"/>
                  <span>Open to relocating?</span>
              </label>
                
              </div>
            </div>
            <div className="row">
              <div className="input-field col m6 s12">
                      <div class="file-field input-field">
                      <div class="btn">
                          <span>Upload Resume</span>
                          <input type="file" id="resume_doc" onChange={handleChange} />
                      </div>
                      <div class="file-path-wrapper">
                          <input class="file-path validate" type="text" placeholder="only in .pdf format" onChange={handleChange}/>
                      </div>
                  </div>
                      
              </div>
              {/* <div className="col s2 input-field inline hide-on-small-only">
               <label> Or</label>
              </div> */}
              <div className="input-field inline col m6 s12">
                    
              <input type="text" id="linkedin_url" onChange={handleChange} />               
                <label htmlFor="linkedin_url">Or Enter LinkedIn Url</label> 
                                     
                   

                    
                
             
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input  id="email" type="email" className="validate"  required="" aria-required="true"/>
                <label htmlFor="email">Email</label>
              </div>
           
              <div className="input-field col s6">
                <input  id="phone" type="number" className="validate" min="1000000000" max="9999999999" required="" aria-required="true"/> 
                <label htmlFor="phone">Phone No.</label>
              </div>
            </div>
          </form>
        </div>
        <span className="error-msg text-center">
              Please upload your resume or enter your linkedin url
            </span>

        <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
      <a onClick={handleSubmit}  class={`close-btn modal-close waves-effect waves-green btn ${disableBtn}`}>Submit</a>
    </div>
        </div>
    )
}

export default TalentForm;
