import React from 'react';
import './PopupSelect.css';
import useOnClickOutside from '../../../hooks/useOnClickOutside.js';

function PopupSelect({ filterType, options, currentOption, onChooseOption }) {

  const [isOpenSelectOptions, setIsOpenSelectOptions] = React.useState(false);

  const selectRef = React.useRef();

  function openSelectOptions() {
    setIsOpenSelectOptions(!isOpenSelectOptions);
  }

  function chooseOption(option) {
    onChooseOption(option);
    setIsOpenSelectOptions(false);
  }

  function handleClickOutside() {
    setIsOpenSelectOptions(false);
  }

  useOnClickOutside(selectRef, handleClickOutside);

  React.useEffect(() => {
    setIsOpenSelectOptions(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={selectRef} className={`select-popup ${isOpenSelectOptions ? 'select-popup_status_open' : ''}`} onClick={openSelectOptions}>
      <div className='select-popup__main'>
        <p className='select-popup__text'>{filterType === 'byElem' ? currentOption : currentOption.name}</p>
        <div className={`select-popup__arrow ${isOpenSelectOptions ? 'select-popup__arrow_status_open' : ''}`}></div>
      </div>
      <div className={`select-popup__options-container ${isOpenSelectOptions ? 'select-popup__options-container_status_open' : ''}`}>
        <ul className='select-popup__options-list scroll'>
          {
            filterType === 'byElem'
            ?
            options.filter(item => item !== currentOption).map((item, i) => (
              <li className='select-popup__options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='select-popup__options-text'>{item}</p>
              </li>
            ))
            :
            options.filter(item => (item.id !== currentOption.id)).map((item, i) => (
              <li className='select-popup__options-item' key={i} onClick={() => chooseOption(item)}>
                <p className='select-popup__options-text'>{item.name}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default PopupSelect;