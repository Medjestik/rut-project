import React from 'react';
import './Table.css';

function Table({ children }) {

  return (
    <div className='table'>
      {
        children
      }
    </div>
  );
}

export default Table; 