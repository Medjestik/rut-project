import React from 'react';
import './Project.css';
import '../Section/Section.css';
import { useParams } from 'react-router-dom';
import * as api from '../../utils/api.js';
import logo from '../../images/logo-rut-color.png';
import ProjectList from './ProjectList/ProjectList.js';
import Search from '../Search/Search.js';
import PopupSelect from '../Popup/PopupSelect/PopupSelect.js';
import Preloader from '../Preloader/Preloader.js';
import DetailPopup from '../Popup/DetailPopup/DetailPopup.js';
import AddUserPopup from '../Popup/AddUserPopup/AddUserPopup.js';

function Project() { 

  const params = useParams();

  const [currentTeam, setCurrentTeam] = React.useState({});
  const [searchedProjects, setSearchedProjects] = React.useState([]);
  const [currentProject, setCurrentProject] = React.useState({});

  const [projectTags, setProjectTags] = React.useState([]);
  const [currentTag, setCurrentTag] = React.useState({});

  const [isShowDetailPopup, setIsShowDetailPopup] = React.useState(false);
  const [isShowAddUserPopup, setIsShowAddUserPopup] = React.useState(false);  
  
  const [isLoadingRequest, setIsLoadingRequest] = React.useState(false);
  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '', });

  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function handleChangeTag(option) {
    setCurrentTag(option);
    if (option.id === 'empty') {
      setSearchedProjects(currentTeam.possible_projects);
    } else {
      const filterProjects = currentTeam.possible_projects.filter((elem) => 
        elem.tags.some(tag => tag.id === option.id)
      );
      setSearchedProjects(filterProjects);
    }
  }

  function handleSearchProject(data) {
    setSearchedProjects(data);
    setCurrentTag({id: 'empty', name: 'Выберите категорию..'});
  }

  function handleAddUser(data) {
    setIsLoadingRequest(true);
    api.addMember({ teamId: params.teamId, data: data })
    .then((res) => {
      setCurrentTeam({...currentTeam, members: [...currentTeam.members, res]});
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    })
  }

  function handleAddProject(project) {
    setIsLoadingRequest(true);
    api.addProject({ teamId: params.teamId, projectId: project.id })
    .then(() => {
      api.getData({ teamId: params.teamId })
      .then((data) => {
        setCurrentTeam(data);
        setSearchedProjects(data.possible_projects);
        setCurrentTag({id: 'empty', name: 'Выберите категорию..'});
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingRequest(false);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getInitialData() {
    Promise.all([
      api.getData({ teamId: params.teamId }),
      api.getTags(),
    ])
    .then(([data, tags]) => {
      console.log(data);
      setCurrentTeam(data);
      setSearchedProjects(data.possible_projects);
      setProjectTags([...tags, {id: 'empty', name: 'Выберите категорию..'}]);
      setCurrentTag({id: 'empty', name: 'Выберите категорию..'});
      setIsLoadingData(false);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      
    })
  }

  function showDetailPopup(elem) {
    setCurrentProject(elem);
    setIsShowDetailPopup(true);
  }

  function showAddUserPopup(elem) {
    setCurrentProject(elem);
    setIsShowAddUserPopup(true);
  }

  function closePopup() {
    setIsShowDetailPopup(false);
    setIsShowAddUserPopup(false);
  }

  React.useEffect(() => {
    getInitialData();

    return(() => {
      setCurrentTeam({});
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingData ?
      <Preloader />
      :
      <div className='wrapper'>
        <div className='project'>
          <div className='container'>
            <div className='project__form'>
              <img className='project__logo' src={logo} alt='лого'></img>
              <h1 className='project__form-title'>Проектная деятельность</h1>
              <p className='project__form-text'>Выберите проект для своей команды.</p>
              <h2 className='project__title'>Команда - «{currentTeam.name}»</h2>
              <p className='data__text'><span className='data__text_font_bold'>Капитан команды:</span>{currentTeam.captain_fullname}</p>
              <button className='project__member-btn' type='button' onClick={showAddUserPopup}>Добавить участника</button>
              <p className='data__text data__text_font_bold data__text_margin_top'>Участники команды:</p>
              
              {
                currentTeam.members.length > 0
                ?
                <ul className='data__list data__list_margin_top'>
                  {
                    currentTeam.members.map((elem, i) => (
                      <li key={i} className='data__item'><p className='data__text'>{i + 1}. {elem.fullname}</p></li>
                    ))
                  }
                </ul>
                :
                <span className='data__text data__text_type_empty'>Список пока пуст!</span>
              }

              <p className='data__text data__text_font_bold data__text_margin_top'>Рекомендованное количество участников в команде от 4 до 7</p>

            </div>
            <div className='project__main'>
              <div className='project__header'>
                <div className='section__header'>
                  <div className='section__header-item'>
                    <span className='section__header-caption'>Направления проектов:</span>
                    <PopupSelect filterType='byId' options={projectTags} currentOption={currentTag} onChooseOption={handleChangeTag} />
                  </div>
                  <div className='section__header-item'>
                    <span className='section__header-caption'>Поиск по названию:</span>
                    <Search type='large' id='project-search' data={currentTeam.possible_projects} onSearch={handleSearchProject} />
                  </div>
                </div>
              </div>
              <ProjectList currentTeam={currentTeam} searchedPrograms={searchedProjects} onShow={showDetailPopup} />
            </div>
          </div>
        </div>
      </div>
    }
    {
      isShowDetailPopup &&
      <DetailPopup 
        isOpen={isShowDetailPopup}
        onClose={closePopup} 
        popupName={'project-detail'} 
        onConfirm={handleAddProject} 
        project={currentProject} 
        isLoadingRequest={isLoadingRequest} 
      />
    }
    {
      isShowAddUserPopup &&
      <AddUserPopup 
        isOpen={isShowAddUserPopup}
        onClose={closePopup} 
        popupName={'add-user'} 
        onConfirm={handleAddUser}
        isLoadingRequest={isLoadingRequest} 
        isShowRequestError={isShowRequestError}
      />
    }
    </>
  )
}

export default Project;  
