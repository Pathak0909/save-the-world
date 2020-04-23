import React from 'react';

const Pagination = ({entriesPerPage, totalData, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData /entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
  
      <ul className='pagination'>
      <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        {pageNumbers.map(num => (
            <li class="active light-blue accent-3 pg"><a onClick={() => paginate(num)} 
                href="#!">{num}</a></li>

        ))}
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>

      </ul>
   
  );
};

export default Pagination;