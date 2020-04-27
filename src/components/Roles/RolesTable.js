import React,{useEffect} from 'react';
import moment from 'moment';
import M from 'materialize-css';
import {Link} from 'react-router-dom'

const RolesTable=({displayData})=>{
    useEffect(()=>{
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems,{});
    })
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
                {/* <td className="tooltipped truncate" data-position="bottom" data-tooltip={el.job_link} >{el.job_link}</td> */}
                <td><a href={el.job_link} target="_blank">{el.job_link}</a></td>
               
              </tr>
              
          )
        })
      }
    return(
        <div className="table container">
            <table className="responsive striped ">
        <thead id="fixedContainer">
          <tr className="field-names">
              <th> Date Posted  </th>
              <th>Company</th>
              <th > Sector</th>
              <th >Description</th>
              <th >Role/Title</th>
              <th >Hiring</th>
              <th >Location</th>
              <th >Point of Contact</th>
              <th >Job Link</th>
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