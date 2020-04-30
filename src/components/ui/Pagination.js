import React from 'react';

const Pagination = ({firstIndex,lastIndex,currentPage,entriesPerPage, totalData, paginate }) => {
  const pageNumbers = [];
  let maxPage=Math.ceil(totalData /entriesPerPage);
  let startingInd=currentPage;
  //let endingInd=currentPage+4<=maxPage?currentPage+4:maxPage;
  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  return (
       <div className="row">
      
       <ul className='pagination'>
     <li className="entries-dets"> {firstIndex+1}-{lastIndex>totalData?lastIndex:totalData} of {totalData}</li>
     <li class=""><a href="#!" onClick={() => paginate(currentPage-1)}><i class="material-icons">chevron_left</i></a></li>
       {/* {pageNumbers.map(num => (
           <li class="active light-blue accent-3 pg"><a onClick={() => paginate(num)} 
               href="#!">{num}</a></li>

       ))} */}
       <li class=""><a href="#!"  onClick={() => paginate(currentPage+1)}><i class="material-icons">chevron_right</i></a></li>
      
     </ul>
       </div>
    
   
  );
};

export default Pagination;
