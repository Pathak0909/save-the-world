import React,{useEffect,useState} from 'react';
import './BrowseTalent.css';
import M from 'materialize-css';
import TalentForm from '../Forms/TalentForm';
import axios from 'axios';
import { filter } from 'minimatch';
import moment from 'moment';
import TalentTable from './TalentTable';

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
         arr.reverse();
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
      const sortRecent=(field)=>{
        console.log(`sorting by ${field}`);
        let temp=[...displayData];
       temp.sort(function(a, b){
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      console.log('after sorting: ',temp);
      setDisplayData(temp);
      }
      const addNewData=(newEntry)=>{
        console.log('inside this: ',newEntry);
        let temp=[...data,newEntry]
        setData(temp);
        setDisplayData(data);
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
                    <div className="col m4 s12 neg-mg-2">
                        <h2 className="">Talent Affected by Covid19</h2>
                    </div>
                    <div className="col m4 s12 float-right neg-mg">
                    <a class='dropdown-trigger btn btn-reg filter-btn' href='#' data-target='sector-dropdown'>
                  <i className="material-icons small left">filter_list</i>
                  Filter By Sector</a>
                    <div class="nav-wrapper">
                    <ul id='sector-dropdown' class='dropdown-content'>
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
                <a class='dropdown-trigger btn btn-reg filter-btn' href='#' data-target='dropdown1'>
                <i className="material-icons small left">sort</i>Sort By</a>

                    <ul id='dropdown1' class='dropdown-content'>
                      <li><a onClick={()=>{sortRecent('createdAt')}}>Date</a></li>
                      <li><a onClick={()=>{sortAlphabetically('name')}}>Name</a></li>
                      <li><a onClick={()=>{sortAlphabetically('college_name')}}>College</a></li>
                      <li><a onClick={()=>{sortAlphabetically('sepcialization')}}>Specialization</a></li>
                      <li><a onClick={()=>{sortAlphabetically('company_name')}}>Company</a></li>
                      {/* <li><a onClick={()=>{sortAlphabetically('sector')}}>Sector</a></li> */}
                      <li><a onClick={()=>{sortAlphabetically('role')}}>Role</a></li>
                      <li><a onClick={()=>{sortAlphabetically('city')}}>City</a></li>
                      
                    </ul>

                        <a className="btn btn-reg filter-btn" onClick={()=>{filter(true)}} >
                        <i className="material-icons small left">filter_list</i>Filter Students</a>
                    
                        <a className="btn btn-reg filter-btn " onClick={()=>{filter(false)}} >
                        <i className="material-icons small left">filter_list</i>Filter Working</a>
                       
                        <a className="btn btn-reg" onClick={()=>{ setDisplayData(data)}}> <i className="material-icons small">refresh</i></a> 
                  </div>
            </div>
    
            <TalentTable displayData={displayData}/>

  <div id="add-talent" class="modal">
    <div class="modal-content talent-modal">
      <TalentForm addNewData={addNewData}></TalentForm>
    </div>
  
   
  </div>
       
       
 </div>
    )
}

export default BrowseTalent;