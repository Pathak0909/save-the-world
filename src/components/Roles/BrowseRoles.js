import React,{useEffect,useState} from 'react';
import './BrowseRoles.css';
import M from 'materialize-css';
import axios from 'axios';
import JobForm from '../Forms/JobForm';
import moment from 'moment';

const BrowseRoles=()=>{
  let [data,setData]=useState([]);
  let [displayData,setDisplayData]=useState([]);
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
        //console.log('arr: ',arr);
       
        setData(arr)
        setDisplayData(arr);
      }
      fetchData();
    },[])
    useEffect(()=>{
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        var dropdwn = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdwn, {});
            
    })
    const sortAlphabetically=(field)=>{
      console.log(`sorting by ${field}`);
      let temp=[...displayData];
     temp.sort(function(a, b){
        if(a[field] < b[field]) { return -1; }
        if(a[field] > b[field]) { return 1; }
        return 0;
    })
    console.log('after sorting: ',temp);
    setDisplayData(temp);
    }
    const filter=(filterType)=>{
      //console.log(data);
      let newArr=data.filter(entry=>{
        if(filterType)
        return entry.hiring_type=='INTERN';
        else
        return entry.hiring_type=='FULL_TIME';
      })
      //console.log(newArr);
      setDisplayData(newArr);
    }
    const filterBySector=(types)=>{
      setDisplayData(data)
      if(types.includes('other'))
      return;
      let newArr=data.filter(entry=>{
        if(types.includes(entry.company_sector.toLowerCase()))
          return entry;
      })
      setDisplayData(newArr);
    }
    if(displayData.length>0){
      //console.log('data: ',arr,'type of ',typeof(arr));
      displayData.forEach(el=>{
        //console.log('el: ',el)
        tableData.push(
           <tr>
              <td>{moment(el.createdAt).subtract(10, 'days').calendar()}</td>
              <td>{el.company_name}</td>
              <td>{el.company_sector?el.company_sector:'-'}</td>
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
//console.log('table data: ',tableData);
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
                    <a class='dropdown-trigger btn filter-btn' href='#' data-target='sector-dropdown'>
                  <i className="material-icons large">sort</i>
                  Filter By Sector</a>
                    <div class="nav-wrapper">
                    <ul id='sector-dropdown' class='dropdown-content'>
                      {/* <li><a onClick={()=>{sortAlphabetically('date')}}>Date</a></li> */}
                      <li><a onClick={()=>{filterBySector(['bd','sales','marketing'])}}>BD/Sales/Marketing</a></li>
                      <li><a onClick={()=>{filterBySector(['engineering','product','design'])}}>Engineering/Product/Design</a></li>
                      <li><a onClick={()=>{filterBySector(['finance','ops','analytics'])}}>Finance/Ops/Analytics</a></li>
                      <li><a onClick={()=>{filterBySector(['retail services'])}}>Retail Services</a></li>
                      <li><a onClick={()=>{filterBySector(['other'])}}>Other</a></li>
                    
                      
                    </ul>
                            </div>
                    </div>
                    
                   
                    
                </div>
                <div className="row">
                <a class='dropdown-trigger btn filter-btn' href='#' data-target='dropdown1'>
                  <i className="material-icons large">sort</i>
                  Sort By</a>

                    <ul id='dropdown1' class='dropdown-content'>
                      {/* <li><a onClick={()=>{sortAlphabetically('date')}}>Date</a></li> */}
                      <li><a onClick={()=>{sortAlphabetically('company_name')}}>Company</a></li>
                      <li><a onClick={()=>{sortAlphabetically('company_sector')}}>Sector</a></li>
                      <li><a onClick={()=>{sortAlphabetically('job_role')}}>Role</a></li>
                      <li><a onClick={()=>{sortAlphabetically('city')}}>City</a></li>
                    
                      
                    </ul>

                        <a className="btn filter-btn" onClick={()=>{filter(true)}} >
                        <i className="material-icons large">filter_list</i>Filter Interns</a>
                    
                        <a className="btn filter-btn " onClick={()=>{filter(false)}} >
                        <i className="material-icons large">filter_list</i>Filter Full Time</a>
                   
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