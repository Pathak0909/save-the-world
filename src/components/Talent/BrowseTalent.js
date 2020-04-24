import React,{useEffect,useState} from 'react';
import './BrowseTalent.css';
import M from 'materialize-css';
import TalentForm from '../Forms/TalentForm';
import axios from 'axios';
import { filter } from 'minimatch';
import moment from 'moment';

const BrowseTalent=()=>{
    let [data,setData]=useState([]);
    let [displayData,setDisplayData]=useState([]);
    let tableData=[];

    useEffect(()=>{
      
      const fetchData=async()=>{
        console.log('inside fetch func')
        let arr=[];
       const result=await axios.get('http://3.14.202.69:8000/get_talent_profile')
          .then(res=>{
          console.log('inside then func')
          console.log('res from talent: ',res.data.data);
          res.data.data.forEach(resData=>{
            arr.push(resData);
          })
         
          })
          .catch(err=>{
            console.log(err);
          })
          console.log('arr: ',arr);
         
          setData(arr)
          setDisplayData(arr);
        }
        fetchData();
      },[])
      useEffect(()=>{
        var sel = document.querySelectorAll('select');
        M.FormSelect.init(sel, {});
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        var dropdwn = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropdwn, {});
      })
      const filterBySector=(types)=>{
        //setDisplayData(data)
        if(types.includes('other'))
        return;
        let newArr=data.filter(entry=>{
          if(types.includes(entry.company_sector.toLowerCase()))
            return entry;
        })
        setDisplayData(newArr);
      }
      const filter=(filterType)=>{
        //setDisplayData(data)
        console.log(data);
        let newArr=data.filter(entry=>{
          if(filterType)
          return entry.is_student;
           else
          return !entry.is_student;
        })
        console.log(newArr);
        setDisplayData(newArr);
      }
      const sortAlphabetically=(field)=>{
        console.log(`sorting with ${field}`)
        let temp=[...displayData];
       temp.sort(function(a, b){
          if(a[field] < b[field]) { return -1; }
          if(a[field] > b[field]) { return 1; }
          return 0;
      })
      console.log('Data after sorting: ',temp);
      setDisplayData(temp);
      }
      const addNewData=(newEntry)=>{
        console.log('inside this: ',newEntry);
        let temp=[...data,newEntry]
        setData(temp);
        setDisplayData(data);
      }
  if(displayData.length>0){
          //console.log('data: ',arr,'type of ',typeof(arr));
          displayData.forEach(el=>{
            //console.log('el: ',el)
            tableData.push(
               <tr>
                  <td>{moment(el.createdAt).subtract(10, 'days').calendar()}</td>
                  <td>{el.name}</td>
                  <td>{el.is_student?'Student':'Working'}</td>
                  <td>{el.college_name}</td>
                  <td>{el.specialization}</td>
                  <td>-</td>
                  <td>{el.company_sector}</td>
                  <td>{el.role}</td>
                  <td>{el.city}</td>
                  <td>{el.is_relocation?'Yes':'No'}</td>
                  <td>{el.email}</td>
                  <td>{el.linkedin_url}</td>
                  {/* <td>9891100201</td> */}
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
     
        <div className="browse_talent">
 
            <div className=" title-box">
                <div className="row">
                    <div className="col m4 s12 float-left">
                        <a className="btn modal-trigger" href="#add-talent">
                        ADD YOURSELF</a>
                    </div>
                    <div className="col m4 s12 center-align">
                        <h5 className="">Talent Affected by Covid19</h5>
                    </div>
                    <div className="col m4 s12 float-right">
                    <a class='dropdown-trigger btn filter-btn' href='#' data-target='sector-dropdown'>
                  <i className="material-icons large">filter_list</i>
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
                <i className="material-icons large">sort</i>Sort By</a>

                    <ul id='dropdown1' class='dropdown-content'>
                      {/* <li><a onClick={()=>{sortAlphabetically('date')}}>Date</a></li> */}
                      <li><a onClick={()=>{sortAlphabetically('name')}}>Name</a></li>
                      <li><a onClick={()=>{sortAlphabetically('college_name')}}>College</a></li>
                      <li><a onClick={()=>{sortAlphabetically('sepcialization')}}>Specialization</a></li>
                      <li><a onClick={()=>{sortAlphabetically('company_name')}}>Company</a></li>
                      {/* <li><a onClick={()=>{sortAlphabetically('sector')}}>Sector</a></li> */}
                      <li><a onClick={()=>{sortAlphabetically('role')}}>Role</a></li>
                      <li><a onClick={()=>{sortAlphabetically('city')}}>City</a></li>
                      
                    </ul>

                        <a className="btn filter-btn" onClick={()=>{filter(true)}} >
                        <i className="material-icons large">filter_list</i>Filter Students</a>
                    
                        <a className="btn filter-btn " onClick={()=>{filter(false)}} >
                        <i className="material-icons large">filter_list</i>Filter Working</a>
                   
                  </div>
            </div>
            <div className="table container">
            <table className="responsive">
        <thead>
          <tr>
              <th>Date Added</th>
              <th>Name</th>
              <th>Studying/Working</th>
              <th>College Name</th>
              <th>Specialization</th>
              <th>Company</th>
              <th>Sector</th>
              <th>Role/Title</th>
              <th>City</th>
              <th>Open to Relocating?</th>
              <th>Email</th>
              <th>Linked URL/Resume</th>
              {/* <th>Phone</th> */}
          </tr>
        </thead>

        <tbody>
    
          {tableData}
          
        </tbody>
      </table>
            </div>

  <div id="add-talent" class="modal">
    <div class="modal-content talent-modal">
      <TalentForm addNewData={addNewData}></TalentForm>
    </div>
  
   
  </div>
       
       
 </div>
    )
}

export default BrowseTalent;