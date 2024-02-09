import React from 'react';
import './TableCard.css';

function TableCard({ children }) {

  return (
    <div className='table-card'>
      <ul className='table-card__list'>
        {
          children
        }
      </ul>
    </div>
  );
}

export default TableCard;