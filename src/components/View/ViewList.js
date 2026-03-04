import React from 'react';

function ViewList({ searchedPrograms, onShow }) { 
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
                  <img className='project-list__item-img project-list__item-img_margin_top' src={elem.image} alt=' ' />
                  :
                  <div className='project-list__item-img'></div>
                }
                {
                  elem.tags.length > 0 &&
                  <ul className='project-list__item-tag-container'>
                    {
                      elem.tags.map((tag, i) => (
                        <li key={i} className={`project-list__item-tag ${tag.name === 'Конкурсный отбор' ? 'project-list__item-tag_color_orange' : ''}`}>#{tag.name}</li>
                      ))
                    } 
                  </ul>
                }
              </div>
              <div className='project-list__item-info'>
                <h4 className='project-list__item-title'>{elem.name || ''}</h4>
                <p className='project-list__item-text'>{elem.target || ''}</p>
                <p className='data__text'><span className='data__text_font_bold data__text_margin_right'>Партнер проекта:</span>{elem.customer.shortname}</p>
                <button className='project-list__item-btn' type='button' onClick={() => onShow(elem)}>Подробнее</button>
              </div>
            </li>
          ))
        }
      </ul>
    }
    </>
  )
}

export default ViewList;