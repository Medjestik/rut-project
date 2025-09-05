import React from 'react';
import Popup from '../Popup.js';

function EditDataPopup({ isOpen, onClose, popupName, data, onConfirm, isLoadingRequest, isShowRequestError }) {

  const [name, setName] = React.useState(data.name || '');
  const [nameError, setNameError] = React.useState({ isShow: false, text: '' });
  const [group, setGroup] = React.useState(data.group_name || '');
  const [groupError, setGroupError] = React.useState({ isShow: false, text: '' });
  const [captain, setCaptain] = React.useState(data.captain_fullname || '');
  const [captainError, setCaptainError] = React.useState({ isShow: false, text: '' });

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true);

  console.log(data);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name, group, captain,
    }
    onConfirm(data);
  }

  function handleChangeName(e) {
    setName(e.target.value);
    if (e.target.checkValidity()) {
      setNameError({ text: '', isShow: false });
    } else {
      setNameError({ text: 'Введите название команды', isShow: true });
    }
  }

  function handleChangeGroup(e) {
    setGroup(e.target.value);
    if (e.target.checkValidity()) {
      setGroupError({ text: '', isShow: false });
    } else {
      setGroupError({ text: 'Введите наименование группы', isShow: true });
    }
  }

  function handleChangeCaptain(e) {
    setCaptain(e.target.value);
    if (e.target.checkValidity()) {
      setCaptainError({ text: '', isShow: false });
    } else {
      setCaptainError({ text: 'Введите фио капитана', isShow: true });
    }
  }

  React.useEffect(() => {
    if (nameError.isShow || name.length < 2 || groupError.isShow || group.length < 2 || captainError.isShow || captain.length < 2) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [name, group, captain]);

  React.useEffect(() => {
    setNameError({ isShow: false, text: '' });
    setGroupError({ isShow: false, text: '' });
    setCaptainError({ isShow: false, text: '' });
  }, [isOpen]);

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
				<h2 className='popup__title popup__title_margin_bottom'>Редактирование данных</h2>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Название команды:</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='team-name'
            value={name}
            onChange={handleChangeName}
            name='team-name' 
            placeholder='Введите название..'
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
            id='team-group'
            value={group}
            onChange={handleChangeGroup}
            name='team-group' 
            placeholder='Введите группу...'
            autoComplete='off'
            required 
            />
          </div>
          <span className={`popup__input-error ${groupError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {groupError.text}
          </span>
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>ФИО капитана (полностью):</h4>
          <div className='popup__input-field'>
            <input 
            className='popup__input'
            type='text'
            id='captain-name'
            value={captain}
            onChange={handleChangeCaptain}
            name='captain-name' 
            placeholder='Введите фио..'
            autoComplete='off'
            required 
            />
          </div>
          <span className={`popup__input-error ${captainError.isShow ? 'popup__input-error_status_show' : ''}`}>
            {captainError.text}
          </span>
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

export default EditDataPopup; 
