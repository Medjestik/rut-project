import React from 'react';
import './NotificationPopup.css';
import Popup from '../Popup.js';
import PreloaderPopup from '../../Preloader/PreloaderPopup/PreloaderPopup.js';
import logo from '../../../images/avatar/rut.png';
import supportAvatar from '../../../images/avatar/support.png';

function NotificationPopup({ isOpen, onClose, notification, isLoading }) {

  const [creator, setCreator] = React.useState({ name: '', pic: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  console.log(notification);

  function createMarkup(text) { return {__html: text }; };

  function defineCreator(elem) {
    if (elem.type === 'system') {
      setCreator({ name: 'Учебный портал', pic: supportAvatar });
    } else if (elem.type === 'news') {
      setCreator({ name: 'РУТ (МИИТ)', pic: logo });
    } else {
      setCreator({ name: elem.tutor.fullname, pic: elem.tutor.pict_url });
    }
  }

  React.useEffect(() => {
    if (!isLoading) {
      defineCreator(notification);
    }
    return (() => {
      setCreator({ name: '', pic: '' });
    })
  }, [isLoading, notification])

  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    formWidth={'medium'}
    formName={'person-area-notification-popup'}
    >
      {
        isLoading ?
        <PreloaderPopup />
        :
        <>
        <div className='notification-popup__creator-container'>
          {
            creator.pic
            ?
            <img className='notification-popup__creator-img' src={creator.pic} alt=''></img>
            :
            <div className='notification-popup__creator-img'></div>
          }
          <div className='notification-popup__creator-info'>
            <h3 className='notification-popup__creator-name'>{creator.name}</h3>
            <span className='notification-popup__creator-date'>{notification.date}</span>
          </div>
        </div>
        <h2 className='popup__title'>{notification.title}</h2>
        <div className='popup__text-container scroll'>
          <div className='popup__text' dangerouslySetInnerHTML={createMarkup(notification.text)} />
        </div>
        {
          notification.files.length > 0 &&
          <div className='notification-popup__links'>
            <p className='notification-popup__link-caption'>Файлы для загрузки:</p>
            {
              notification.files.map((file, i) => (
                <a key={i} className='link notification-popup__link' href={file.name}>{i + 1}. {file.name}</a>
              ))
            }
          </div>
        }
        <button className='popup__btn-back' type='submit'>Назад</button>
        </>
      }
    </Popup>
  )
}

export default NotificationPopup;