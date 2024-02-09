import React from 'react';
import Popup from '../Popup.js';
import GetBase64File from '../../../custom/GetBase64File.js';

function UploadFilePopup({ isOpen, onClose, popupName, onAdd, isLoadingRequest, isShowRequestError }) {

  const [isBlockSubmitButton, setIsBlockSubmitButton] = React.useState(true); 

  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState({ isShow: false, text: '' });

  const [fileName, setFileName] = React.useState({ isShow: false, name: '', });

  const [fileError, setFileError] = React.useState({ isShow: false, text: '' });

  const [contentFile, setContentFile] = React.useState({ file: null, });

  function handleSubmit(e) {
    e.preventDefault();
    const file = { file: contentFile.file, title: title, fileName: fileName.name };
    onAdd(file);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
    if (e.target.checkValidity()) {
      setTitleError({ text: '', isShow: false });
    } else {
      setTitleError({ text: 'Поле не может быть пустым', isShow: true });
    }
  }

  function handleChangeFile(e) {
    setFileName({ isShow: false, name: '' });
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      if(file.size > 10485760) {
        setFileError({ text: 'Размер файла превышает 10 MB', isShow: true });
      } else {
        setFileError({ text: '', isShow: false });
        GetBase64File(file)
        .then(result => {
          file['base64'] = result;
          setFileName({ isShow: true, name: file.name });
          setContentFile({ file: file.base64 });
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

  React.useEffect(() => {
    if ((contentFile.file === null) || (title.length < 1)) {
      setIsBlockSubmitButton(true);
    } else {
      setIsBlockSubmitButton(false);
    }
  // eslint-disable-next-line
  }, [title, contentFile]);

  React.useEffect(() => {
    setTitle('');
    setTitleError({ text: '', isShow: false });
    setIsBlockSubmitButton(true);
    return(() => {
    })
  }, [isOpen]);

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      formWidth={'medium'}
      formName={popupName}
    >
      <h2 className='popup__title'>Добавление файла</h2>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Название файла:</h4>
        <div className='popup__input-field'>
          <input 
          className='popup__input'
          type='text'
          id={popupName + '-title'}
          value={title}
          onChange={handleChangeTitle}
          name={popupName + '-title'}
          placeholder='Введите название файла..'
          autoComplete='off'
          minLength={1}
          required 
          />
        </div>
        <span className={`popup__input-error ${titleError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {titleError.text}
        </span>
      </label>

      <label className='popup__field'>
        <h4 className='popup__input-caption'>Выберите файл:</h4>
        <div className='upload-form__container'>
          <div className='upload-form__section'>
            <label htmlFor={popupName + '-file-upload'} className='upload-form__field'>
              <p className='upload-form__text'>{fileName.isShow ? fileName.name : ''}</p>
              <div className='upload-form__icon'></div>
            </label>
            <input onChange={handleChangeFile} id={popupName + '-file-upload'} name={popupName + '-file-upload'} className='upload-form__input' type="file" />
          </div>
        </div>
        <span className={`popup__input-error ${fileError.isShow ? 'popup__input-error_status_show' : ''}`}>
          {fileError.text}
        </span>
      </label>

      <div className='popup__btn-container'>
        <button className='popup__btn-cancel' type='button' onClick={() => onClose()}>Назад</button>
        {
          isLoadingRequest ? 
          <button className='popup__btn-save popup__btn-save_type_loading' disabled type='button'>Сохранение..</button>
          :
          <button className={`popup__btn-save ${isBlockSubmitButton ? 'popup__btn-save_type_block' : ''}`} type='submit'>Сохранить</button>
        }
      </div>
      <span className={`popup__input-error ${isShowRequestError.isShow && 'popup__input-error_status_show'}`}>{isShowRequestError.text}</span>
    </Popup>
  )
}

export default UploadFilePopup;