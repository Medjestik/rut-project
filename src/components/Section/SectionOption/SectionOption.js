import React from 'react';
import './SectionOption.css';

function SectionOption({ options, children }) {

  const [data, setData] = React.useState(options);

  function selectOption(option) {
    let arrayOptions = data;
    const newOptions = arrayOptions.map((item, i) => {
      return { ...item, status: item.id === option.id ? 'active' : 'inactive' }
    })
    setData(newOptions);
  }

  return (
    <section className='section__options'>
      <ul className='section__options-list'>
        {
          data.map((item, i) => (
            <li 
            onClick={() => selectOption(item)} 
            key={i} 
            className={`section__options-item ${item.status === 'active' ? 'section__options-item_type_active' : ''}`}>
              {
                item.status === 'active' 
                ?
                <h4 className='section__options-title'>{item.title}</h4>
                :
                <div className='section__options-attention'></div>
              }
            </li>
          ))
        }
      </ul>
      <div className='section section__options-container'>
        {children}
      </div>
    </section>

  );
}

export default SectionOption;