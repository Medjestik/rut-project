import React from 'react';
import './Popup.css';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';

function Popup({ isOpen, onClose, onSubmit, formWidth, formName, children }) {

  const formRef = React.createRef();
  const [formHeight, setFormHeight] = React.useState(false);

  React.useEffect(() => {
    if (formRef.current.clientHeight < 420) {
      setFormHeight(true);
    }
  }, [formRef]);

  useOnClickOutside(formRef, onClose);

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='scroll popup__container'>
        <form
          ref={formRef}
          className={`popup__form popup__form_width_${formWidth} ${formHeight ? 'popup__form_height_min' : ''}`}
          name={formName}
          action='#'
          noValidate 
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  )
}

export default Popup;