import React from 'react';

function ProjectList({ currentTeam, searchedPrograms, onShow }) { 

  function renderButton(elem) {
    if (currentTeam.participation.length > 0) {
      if ((currentTeam.participation[0].project.id === elem.id)) {
        return (
          <button className='project-list__item-btn project-list__item-btn_color_orange' type='button' disabled>Выбранный проект</button>
        )
      } else if ((elem.teams_count >= elem.max_teams) && (currentTeam.participation[0].project.id !== elem.id)) {
        return (
          <button className='project-list__item-btn project-list__item-btn_color_grey' type='button' disabled>Места закончились</button>
        )
      } else {
        return (
          <button className='project-list__item-btn' type='button' onClick={() => onShow(elem)}>Подробнее</button>
        )
      }
    } else {
      if (elem.teams_count >= elem.max_teams) {
        return (
          <button className='project-list__item-btn project-list__item-btn_color_grey' type='button' disabled>Места закончились</button>
        )
      } else {
        return (
          <button className='project-list__item-btn' type='button' onClick={() => onShow(elem)}>Подробнее</button>
        )
      }
    }
  }

  return (
    <>
    {
      searchedPrograms.length > 0 &&
      <ul className='project-list scroll-inside'>
        {
          searchedPrograms.map((elem, i) => (
            <li key={i} className='project-list__item'>
              <div className='project-list__item-img-container'>
                {
                  elem.image 
                  ?
                  <img className='project-list__item-img project-list__item-img_margin_top' src={`https://project-api.emiit.ru${elem.image}`} alt=' ' />
                  :
                  <div className='project-list__item-img'></div>
                }
                {
                  elem.tags.length > 0 &&
                  <ul className='project-list__item-tag-container'>
                    {
                      elem.tags.map((tag, i) => (
                        <li key={i} className='project-list__item-tag'>#{tag.name}</li>
                      ))
                    } 
                  </ul>
                }
              </div>
              <div className='project-list__item-info'>
                <h4 className='project-list__item-title'>{elem.name || ''}</h4>
                <p className='project-list__item-text'>{elem.target || ''}</p>
                <p className='data__text'><span className='data__text_font_bold'>Партнер проекта:</span>{elem.customer.shortname}</p>
                <p className='data__text'><span className='data__text_font_bold'>Количество команд:</span>{elem.teams_count}/{elem.max_teams}</p>
                {
                  renderButton(elem)
                }
              </div>
            </li>
          ))
        }
      </ul>
    }
    </>
  )
}

export default ProjectList;