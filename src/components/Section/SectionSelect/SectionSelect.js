import React from 'react';
import './SectionSelect.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside.js';

function SectionSelect({ sections, currentSection, onChooseSection }) {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  const selectRef = React.useRef();

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    onChooseSection(option);
    setIsOpenSelectOptions(false);
  }

  function handleClickOutside() {
    setIsOpenSelectOptions(false);
  }

  useOnClickOutside(selectRef, handleClickOutside);

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    return(() => {
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={selectRef} className={`section__select ${isOpenSelectOptions ? 'section__select_status_open' : ''}`}>
      <div className='section__select-main' onClick={openSelectOptions}>
        <p className='section__select-text'>{currentSection.title}</p>
        <div className={`section__select-arrow ${isOpenSelectOptions ? 'section__select-arrow_status_open' : ''}`}></div>
      </div>
      <div className={`section__select-options-container ${isOpenSelectOptions ? 'section__select-options-container_status_open' : ''}`}>
        <ul className='section__select-options-list'>
          {
            sections.filter(item => item.id !== currentSection.id).map((item, i) => (
              <li className='section__select-options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='section__select-options-text'>{item.title}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default SectionSelect; 