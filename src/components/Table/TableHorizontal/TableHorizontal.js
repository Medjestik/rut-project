import React from 'react';
import './TableHorizontal.css';

function TableHorizontal({ children }) {

  return (
    <div className='table-horizontal scroll'>
      {
        children
      }
    </div>
  );
}

export default TableHorizontal; 