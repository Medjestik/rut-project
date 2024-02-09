import React from 'react';
import './TableList.css';

function TableList({ children }) {

  return (
    <ul className='table-list'>
      {
        children
      }
    </ul>
  );
}

export default TableList;