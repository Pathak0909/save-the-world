import React,{useEffect,useState} from 'react';
import './BrowseRoles.css';
import M from 'materialize-css';
import axios from 'axios';
import JobForm from '../Forms/JobForm';
import moment from 'moment';
import Pagination from '../ui/Pagination';
import RolesTable from './RolesTable';

const BrowseRoles=()=>{
  let [data,setData]=useState([]);
  let [displayData,setDisplayData]=useState([]);
  // let [currentPage,setCurrentPage]=useState(1);
  // let [entriesPerPage,setEntriesPerPage]=useState(5);
  // let [currentData,setCurrentData]=useState([]);
  // let indexOfLastEntry=currentPage*entriesPerPage;
  // let indexOfFirstEntry=indexOfLastEntry-entriesPerPage;
  // const pageNumbers=[];    
  
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
       arr.reverse()
        })
        .catch(err=>{
          console.log(err);
        })
        //console.log('arr: ',arr);
       
        setData(arr)
        
        setDisplayData(arr)
        //setDisplayData(arr.slice(indexOfFirstEntry,indexOfLastEntry))
        //setDisplayData(currentData)
       
      }
      fetchData();
      // setDisplayData(currentData);
    },[])
    useEffect(()=>{
      var sel = document.querySelectorAll('select');
      M.FormSelect.init(sel, {});
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems, {});
      var dropdwn = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(dropdwn, {});
    })
    // for(let i=1; i<=Math.ceil(data/entriesPerPage); i++)
    // pageNumbers.push(i);

    // console.log(pageNumbers);
    //get current posts

//displayData=data.slice(indexOfFirstEntry,indexOfLastEntry);
//setDisplayData(currentData)
    const sortAlphabetically=(field)=>{
      console.log(`sorting by ${field}`);
      let temp=[...displayData];
     temp.sort(function(a, b){
      
        if(a[field].toLowerCase() < b[field].toLowerCase()) { return -1; }
        if(a[field].toLowerCase() > b[field].toLowerCase()) { return 1; }
        return 0;
    })
    console.log('after sorting: ',temp);
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
    const filter=(filterType)=>{
      
      //console.log(data);
     // let temp=[...displayData];
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
     
      if(types.includes('other'))
      return;
      let newArr=data.filter(entry=>{
        if(types.includes(entry.company_sector.toLowerCase()))
          return entry;
      })
      setDisplayData(newArr);
    }
const search=(e)=>{
  let searchParam=e.target.value.toLowerCase();
  console.log('search triggered');
  let newArr=data.filter(entry=>{
    if(
      entry.city.toLowerCase().includes(searchParam) ||
      entry.company_sector.toLowerCase().includes(searchParam) ||
      entry.company_name.toLowerCase().includes(searchParam)
    ) return entry;
  })
  setDisplayData(newArr);
  //this.setState({search: e.target.value.substr(0, 20)});
}
if(data.length>0)
console.log('Data: ',data);
//console.log('table data: ',tableData);
// if(tableData.length==0) return (<div>Loading...</div>)
// else
//const paginate = pageNumber => setCurrentPage(pageNumber);


  return(
               <div className="browse_roles">
            <div className="title-box">
                <div className="row">
                    <div className="col m4 lg4 s12 float-left">
                        <a className="btn modal-trigger" href="#job-post">Post a Job</a>
                    </div>
                    <div className="col m4 lg4 s12 center-align neg-mg-2">
                        <h2 className="">Companies Hiring and Open Roles</h2>
                    </div>
                    <div class="input-field col m4 lg4 s12 float-right ">
                       
                    {/* <nav> */}
                      <div class="nav-wrapper">
                        {/* <form> */}
                          <div class="input-field">
                            <input id="search" type="search" class="" required onChange={search} placeholder="search jobs by company, sector or location" />
                            <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                            <i class="material-icons">close</i>
                          </div>
                        {/* </form> */}
                      </div>
                    {/* </nav> */}
                   </div>
                   
                    
                </div>
                <div className="row">
                <a class='dropdown-trigger btn filter-btn' href='#' data-target='dropdown1'>
                  <i className="material-icons small left">sort</i>
                  Sort By</a>

                    <ul id='dropdown1' class='dropdown-content'>
                      <li><a onClick={()=>{sortRecent('createdAt')}}>Date Posted</a></li>
                      <li><a onClick={()=>{sortAlphabetically('company_name')}}>Company</a></li>
                      <li><a onClick={()=>{sortAlphabetically('company_sector')}}>Sector</a></li>
                      <li><a onClick={()=>{sortAlphabetically('job_role')}}>Role</a></li>
                      <li><a onClick={()=>{sortAlphabetically('city')}}>City</a></li>
                    
                      
                    </ul>

                        <a className="btn filter-btn" onClick={()=>{filter(true)}} >
                        <i className="material-icons small left">filter_list</i>Filter Interns</a>
                    
                        <a className="btn filter-btn " onClick={()=>{filter(false)}} >
                        <i className="material-icons small left">filter_list</i>Filter Full Time</a>
                        <a className="btn" onClick={()=>{ setDisplayData(data)}}> <i className="material-icons small">refresh</i></a> 

                  </div>
            </div>
 
            <RolesTable displayData={displayData}/>
            <div id="job-post" class="modal">
    <div class="modal-content role-modal">
      <JobForm></JobForm>
    
    </div>
  
  </div>
        {/* <Pagination 
        entriesPerPage={entriesPerPage}
        totalData={data.length}
        paginate={paginate}
        /> */}
            
        </div>
    )
}

export default BrowseRoles;