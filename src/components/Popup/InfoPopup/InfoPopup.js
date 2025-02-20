import React from 'react';
import Popup from '../Popup.js';
import './InfoPopup.css';
import { getProjectDetail } from '../../../utils/api.js';
import PreloaderPopup from '../../Preloader/PreloaderPopup/PreloaderPopup.js';

function InfoPopup({ isOpen, onClose, popupName, project }) {

	const [isLoadingData, setIsLoadingData] = React.useState(true);
  const [currentData, setCurrentData] = React.useState({});

  function handleSubmit(e) {
    e.preventDefault();
  }

	function getDetail() {
		getProjectDetail({ projectId: project.id })
    .then((res) => {
      console.log(res);
      setCurrentData(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingData(false);
    })
	}

  const getParagraphs = (text) => {
    return text.split('\n').map((paragraph, index) => (
      <p className='detail__text' key={index}>{paragraph}</p>
    ));
  };

	React.useEffect(() => {
		getDetail();
    return(() => {
      setCurrentData({});
    })
		// eslint-disable-next-line
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
				isLoadingData 
				?
				<PreloaderPopup />
				:
				<>
				<h2 className='popup__title popup__title_margin_bottom'>{currentData.name}</h2>
        <p className='data__text'><span className='data__text_font_bold data__text_margin_right'>Партнер проекта:</span>{currentData.customer.shortname}</p>
        <p className='data__text'><span className='data__text_font_bold data__text_margin_right'>Количество команд:</span>{currentData.teams_count}/{currentData.max_teams}</p>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Носитель проблемы:</h4>
          <p
            className='detail__text'
          >
            {currentData.owner || ''}
          </p>
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Цель:</h4>
          <p
            className='detail__text'
          >
            {currentData.target || ''}
          </p>
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Барьер:</h4>
            {getParagraphs(currentData.problem || '')}
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Существующие решения:</h4>
          {getParagraphs(currentData.task || '')}
        </div>

        <div className='popup__field'>
          <h4 className='popup__input-caption'>Контекст:</h4>
          <p
            className='detail__text'
          >
            {currentData.context || ''}
          </p>
        </div>

				<div className='popup__btn-container'>
					<button className='popup__btn-save' type='button' onClick={() => onClose()}>Назад</button>
				</div>
				</>

			}
    </Popup>
  )
}

export default InfoPopup;
