import React,{useEffect,useState} from 'react';
import './BrowseRoles.css';
import M from 'materialize-css';
import axios from 'axios';
import JobForm from '../Forms/JobForm';

const BrowseRoles=()=>{
  let [data,setData]=useState([]);
  let tableData=[];
  useEffect(()=>{
      
    const fetchData=async()=>{
      
      let arr=[];
     const result=await axios.get('http://3.14.202.69:8000/get_talent_connect_role')
        .then(res=>{
        console.log('res from role: ',res.data.data);
        res.data.data.forEach(resData=>{
          arr.push(resData);
        })
       
        })
        .catch(err=>{
          console.log(err);
        })
        console.log('arr: ',arr);
       
        setData(arr)
      }
      fetchData();
    },[])
    useEffect(()=>{
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        
            
    })
    if(data.length>0){
      //console.log('data: ',arr,'type of ',typeof(arr));
      data.forEach(el=>{
        console.log('el: ',el)
        tableData.push(
           <tr>
              <td>{el.createdAt}</td>
              <td>{el.company_name}</td>
              <td>-</td>
              <td>{el.description}</td>
              <td>{el.job_role}</td>
              <td>{el.hiring_type}</td>
              <td>{el.city}</td>
              <td>{el.point_of_contact}</td>
              <td>{el.job_link}</td>
             
            </tr>
            
        )
      })
    }
if(data.length>0)
console.log('Data: ',data);
console.log('table data: ',tableData);
// if(tableData.length==0) return (<div>Loading...</div>)
// else
  return(
               <div className="browse_roles">
            <div className="title-box">
                <div className="row">
                    <div className="col m4 s12 float-left">
                        <a className="btn modal-trigger" href="#job-post">Post a Job</a>
                    </div>
                    <div className="col m4 s12 center-align">
                        <h5 className="">Talent Affected by Covid19</h5>
                    </div>
                    <div className="col m4 s12 float-right">
                    <div class="nav-wrapper">
                            <form>
                                <div class="input-field">
                                <input id="search" type="search" placeholder="Search for jobs by sector" required/>
                                <label class="label-icon" for="search"><i class="material-icons">search</i>

                                </label>
                                <i class="material-icons">close</i>
                                </div>
                            </form>
                            </div>
                    </div>
                    
                   
                    
                </div>
                
            </div>
            <div className="table container">
            <table className="responsive">
        <thead>
          <tr className="field-names">
              <th> Date Posted  </th>
              <th>Company</th>
              <th> Sector</th>
              <th>Description</th>
              <th>Role/Title</th>
              <th>Hiring</th>
              <th>Location</th>
              <th>Point of Contact</th>
              <th>Job Link</th>
          </tr>
        </thead>

        <tbody>
      
        {tableData}
        </tbody>
      </table>
            </div>
            <div id="job-post" class="modal">
    <div class="modal-content role-modal">
      <JobForm></JobForm>
    
    </div>
  
  </div>
        
        </div>
    )
}

export default BrowseRoles;