import React from 'react';
import moment from 'moment';

const TalentTable=({displayData})=>{
    let tableData=[];
    if(displayData.length>0){
        //console.log('data: ',arr,'type of ',typeof(arr));
        displayData.forEach(el=>{
          //console.log('el: ',el)
          tableData.push(
             <tr>
                <td>{moment(el.createdAt).format('l')}</td>
                <td>{el.name}</td>
                <td>{el.is_student?'Student':'Working'}</td>
                <td>{el.college_name}</td>
                <td>{el.specialization}</td>
                <td>{el.company_name}</td>
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
    return(
                    <div className="table container">
            <table className="responsive striped">
        <thead>
          <tr className="field-names">
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