import React from 'react';
import moment from 'moment';

const RolesTable=({displayData})=>{
    let tableData=[];
    if(displayData.length>0){
        //console.log('data: ',arr,'type of ',typeof(arr));
        displayData.forEach(el=>{
          //console.log('el: ',el)
          tableData.push(
             <tr >
                <td>{moment(el.createdAt).format('l')}</td>
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
    return(
        <div className="table container">
            <table className="responsive striped centered">
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
    )
}

export default RolesTable;