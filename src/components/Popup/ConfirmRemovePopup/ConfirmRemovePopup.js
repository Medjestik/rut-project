import React from 'react';
import Popup from '../Popup.js';

function ConfirmRemovePopup({ isOpen, onClose, popupName, onConfirm, data, isLoadingRequest, isShowRequestError }) {

  function handleSubmit(e) {
    e.preventDefault();

    onConfirm(data);
  }

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'small'}
    formName={popupName}
    >
      <h2 className='popup__title'>Подтверждение удаления</h2>
      <p className='popup__subtitle'>Вы действительно хотите отправить запрос на&nbsp;удаление?</p>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className='popup__btn-save' type='submit'>Подтвердить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default ConfirmRemovePopup; 