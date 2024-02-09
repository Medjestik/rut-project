import React from 'react';
import './PreloaderPopup.css';

function PreloaderPopup() {
  return (
    <figure className="preloader-popup">
      <i className="preloader-popup__circle"></i>
      <figcaption className="preloader-popup__caption">Идёт загрузка...</figcaption>
    </figure>
  )
}

export default PreloaderPopup;