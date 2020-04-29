import React,{useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';

const TalentTable=({displayData})=>{
  useEffect(()=>{

  },[])
  const getResume=resume=>{
    console.log(resume);
    axios.get(`http://3.14.202.69:8000/uploads/covid-19/${resume}`)
      .then(res=>{
        console.log(res.config.url);
        const url=res.config.url;
        window.open(url,'_blank')
      })
      .catch(err=>{
        console.log(err);
      })
    //console.log('inside here');
    //console.log(resume);
  }
    let tableData=[];
    if(displayData.length>0){
        //console.log('data: ',arr,'type of ',typeof(arr));
        // let linkedin_url=el.linkedin_url
        displayData.forEach(el=>{
          //console.log('el: ',el)
          let resume=el.resume_path && el.resume_path!=='undefined_COVID-19.pdf'?<button className="btn" onClick={()=>{getResume(el.resume_path)}}>View Resume</button>:'';
          tableData.push(
             <tr>
                <td>{moment(el.createdAt).format('l')}</td>
                <td>{el.name}</td>
                <td>{el.company_sector}</td>
                <td>{el.is_student?'Student':'Working'}</td>
                <td>{el.college_name}</td>
                <td>{el.specialization}</td>
                <td>{el.company_name}</td>
                <td>{el.role}</td>
                <td>{el.city}</td>
                <td>{el.is_relocation?'Yes':'No'}</td>
                <td>{el.email}</td>
                <td>
                  {resume}
                                
                </td>
                <td><a href={el.linkedin_url} target="_blank">{el.linkedin_url}</a></td>
                {/* <td>9891100201</td> */}
              </tr>
              
          )
        })
      }
    return(
                    <div className="table">
            <table className="responsive striped">
        <thead>
          <tr className="field-names">
              <th>Date Added</th>
              <th>Name</th>
              <th>Sector</th>
              <th>Studying/Working</th>
              <th>College Name</th>
              <th>Course/Branch</th>
              <th>Company</th>
              <th>Role/Title</th>
              <th>City</th>
              <th>Open to Relocating?</th>
              <th>Email</th>
              <th>Resume</th>
              <th>LinkedIn URL</th>
             
          </tr>
        </thead>

        <tbody>
    
          {tableData}
          
        </tbody>
      </table>
            </div>
    )
}

export default TalentTable;