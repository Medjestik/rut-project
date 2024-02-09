import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
        <figure className='preloader'>
            <i className='preloader__circle'></i>
            <figcaption className='preloader__caption'>Идёт загрузка...</figcaption>
        </figure>
    )
}

export default Preloader;