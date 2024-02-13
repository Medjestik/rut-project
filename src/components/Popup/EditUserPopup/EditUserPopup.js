import React from 'react';
import Popup from '../Popup.js';

function EditUserPopup({ isOpen, onClose, popupName, currentUser, onConfirm, isLoadingRequest, isShowRequestError }) {

  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });
  const [group, setGroup] = React.useState('');

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: name, group: group, phone: '', email: '', id: currentUser.id,
    }
    onConfirm(data);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Введите фио', isShow: true });
    }
  }

  function handleChangeGroup(e) {
    setGroup(e.target.value);
  }

  React.useEffect(() => {
    if (nameError.isShow || name.length < 2) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [name]);

  React.useEffect(() => {
    setName(currentUser.fullname);
    setNameError({ isShow: false, text: '' });
    setGroup(currentUser.group_name);
  }, [currentUser, isOpen]);

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'large'}
    formName={popupName}
    >
			{
        <>
				<h2 className='popup__title popup__title_margin_bottom'>Добавление участника</h2>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>ФИО (полностью):</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='user-name'
            value={name}
            onChange={handleChangeName}
            name='user-name' 
            placeholder='Введите фио участника...'
            autoComplete='off'
            required 
            />
          </div>
          <span className={`popup__input-error ${nameError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {nameError.text}
          </span>
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Группа:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='user-group'
            value={group}
            onChange={handleChangeGroup}
            name='user-group' 
            placeholder='Введите группу...'
            autoComplete='off'
            required 
            />
          </div>
        </div>
        
				<div className='popup__btn-container'>
					<button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Отменить</button>
					{
						isLoadingRequest ? 
						<button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
						:
						<button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
					}
				</div>
				<span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
				</>
			}
    </Popup>
  )
}

export default EditUserPopup; 