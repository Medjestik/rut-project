import React from 'react';
import './Section.css';

function Section({ title, heightType, headerType, children }) {

  return (
    <section className={`section__page section__page_type_${heightType}`}>
      <ul className='section__page-list'>
        <li className={`section__page-item section__page-item_type_${headerType}`}>
          <h4 className='section__page-title'>{title}</h4>
        </li>
      </ul>
      <div className={`section section__page-container section__page-container_type_${heightType}`}>
        {children}
      </div>
    </section>
  );
}

export default Section;  