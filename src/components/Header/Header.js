import React from 'react';
import './Header.css';
import HeaderMobile from './HeaderMobile/HeaderMobile.js';
import { useLocation, NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { personIcon, educationIcon, webinarIcon, ratingIcon, documentIcon, libraryIcon, logoutIcon, disciplineIcon, journalIcon, controlIcon, curatorIcon, admissionIcon } from './HeaderIcons/HeaderIcons.js';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';

function Header({ windowWidth, pathname, onLogout, semesterInfo }) {

  const currentUser = React.useContext(CurrentUserContext);
  const refMobileHeader = React.useRef();

  const location = useLocation();

  const [isShowMobileMenu, setIsShowMobileMenu] = React.useState(false);
  const [isEducationOpen, setIsEducationOpen] = React.useState(location.pathname.includes('/education') ? true : false);
  const [isDisciplinesOpen, setIsDisciplinesOpen] = React.useState(location.pathname.includes('/semester') ? true : false);
  const [isCuratorOpen, setIsCuratorOpen] = React.useState(location.pathname.includes('/curator') ? true : false);

  function showMobileMenu() {
    setIsShowMobileMenu(true);
    document.body.style.overflow = 'hidden';
  }

  function hideMobileMenu() {
    setIsShowMobileMenu(false);
    document.body.style.overflow = '';
  }
  
  function renderDotLinks() {
    return (
      <>
      <NavLink 
      onClick={hideMobileMenu}
      className={`header__nav-link + ${isEducationOpen ? 'header__nav-link_type_active' : ''}`} 
      to={`/education/semester/${semesterInfo[semesterInfo.length - 1].semesterId}/disciplines`}
      >
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { educationIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Обучение</p>
      </NavLink>

      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/webinars'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { webinarIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Вебинары</p>
      </NavLink>

      {/*
        <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/rating'>
          <div className='header__nav-link-icon'>
            <div className='header__nav-link-icon-container'>
              { ratingIcon }
            </div>
          </div>
          <p className='header__nav-link-text'>Рейтинг</p>
        </NavLink>

      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/document'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { documentIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Документы</p>
      </NavLink>
      */
      }
      </>
    )
  }

  function renderUserLinks() {
    return (
      <>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/courses'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { libraryIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Курсы</p> 
      </NavLink>
      </>
    )
  }

  function renderTeacherLinks() {
    return (
      <>
      <NavLink
      onClick={hideMobileMenu}
      className={`header__nav-link + ${isDisciplinesOpen ? 'header__nav-link_type_active' : ''}`}
      to={`/semester/${semesterInfo[0].id}/disciplines`}
      >
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { disciplineIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Учебная работа</p> 
      </NavLink>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/webinars'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { webinarIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Вебинары</p>
      </NavLink>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/courses'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { libraryIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Курсы</p> 
      </NavLink>

      {
        /*
        <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/journal'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { journalIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Ведомости</p> 
        </NavLink>
        */
      }

      <NavLink 
      onClick={hideMobileMenu}
      className={`header__nav-link + ${isCuratorOpen ? 'header__nav-link_type_active' : ''}`}
      to='/curator/groups/current'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { curatorIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Куратор</p> 
      </NavLink>
      </>
    )
  }

  function renderAdminLinks() {
    return (
      <>
      <NavLink
      onClick={hideMobileMenu}
      className={`header__nav-link + ${isDisciplinesOpen ? 'header__nav-link_type_active' : ''}`}
      to={`/semester/${semesterInfo[0].id}/disciplines`}
      >
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { disciplineIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Учебная работа</p> 
      </NavLink>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/webinars'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { webinarIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Вебинары</p>
      </NavLink>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/courses'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { libraryIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Курсы</p> 
      </NavLink>
      <NavLink 
      onClick={hideMobileMenu}
      className={`header__nav-link + ${isCuratorOpen ? 'header__nav-link_type_active' : ''}`}
      to='/curator/groups/current'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { curatorIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Куратор</p> 
      </NavLink>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/control'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { controlIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Управление</p> 
      </NavLink>
      {
        /*
        <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/admission'>
          <div className='header__nav-link-icon'>
            <div className='header__nav-link-icon-container'>
              { admissionIcon }
            </div>
          </div>
          <p className='header__nav-link-text'>Поступление</p> 
        </NavLink>
        */
      }
      </>
    )
  }

  function renderPersonLinks() {
    return (
      <>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/person'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { personIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Личный кабинет</p>
      </NavLink>
      </>
    )
  }

  function renderLibraryLinks() {
    return (
      <>
      <NavLink onClick={hideMobileMenu} className={({ isActive }) => 'header__nav-link ' + (isActive ? 'header__nav-link_type_active' : '')} to='/library'>
        <div className='header__nav-link-icon'>
          <div className='header__nav-link-icon-container'>
            { libraryIcon }
          </div>
        </div>
        <p className='header__nav-link-text'>Библиотека</p> 
      </NavLink>
      </>
    )
  }

  useOnClickOutside(refMobileHeader, hideMobileMenu);

  React.useEffect(() => {
    setIsEducationOpen(location.pathname.includes('/education') ? true : false);
    setIsDisciplinesOpen(location.pathname.includes('/semester') ? true : false);
    setIsCuratorOpen(location.pathname.includes('/curator') ? true : false);
  }, [location]);
 
  return (

    <>
      {
        windowWidth < 1279 &&
        <HeaderMobile showMobileMenu={showMobileMenu} pathname={pathname} />
      }
      
      <header className={`header ${isShowMobileMenu ? 'header-mobile_status_show' : 'header-mobile_status_hide'}`}>
        <div className='header__container' ref={refMobileHeader}>
          {
            currentUser.avatar.link
            ?
            <img className='header__img' src={currentUser.avatar.link} alt='аватар'></img>
            :
            <div className='header__img'></div>
          }
          
          <h3 className='header__name'>{currentUser.fullname || ''}</h3>
          <nav className='scroll header__nav'>

            {
              renderPersonLinks()
            }
            
            {
              currentUser.access_role === 'dot' && renderDotLinks()
            }

            {
              currentUser.access_role === 'user' && renderUserLinks()
            }

            {
              currentUser.access_role === 'tutor' && renderTeacherLinks()
            }
            
            {
              currentUser.access_role === 'admin' && renderAdminLinks()
            }
        
          </nav>
          
          <button className='header__nav-link header__nav-link_type_logout' onClick={onLogout}>
            <div className='header__nav-link-icon'>
                <div className='header__nav-link-icon-container'>
                  { logoutIcon }
                </div>
            </div>
            <p className='header__nav-link-text'>Выйти</p>
          </button>
        </div>
      </header>
    </>

  );
}

export default Header;