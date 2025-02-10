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
import EditDataPopup from '../Popup/EditDataPopup/EditDataPopup.js';
import AddUserPopup from '../Popup/AddUserPopup/AddUserPopup.js';
import EditUserPopup from '../Popup/EditUserPopup/EditUserPopup.js';
import ConfirmRemovePopup from '../Popup/ConfirmRemovePopup/ConfirmRemovePopup.js';
import InfoPopup from '../Popup/InfoPopup/InfoPopup.js';

function Project({ windowWidth }) { 

  const params = useParams();

  const [currentTeam, setCurrentTeam] = React.useState({});
  const [searchedProjects, setSearchedProjects] = React.useState([]);
  const [currentProject, setCurrentProject] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const [projectTags, setProjectTags] = React.useState([]);
  const [currentTag, setCurrentTag] = React.useState({});

  const [isShowInfoPopup, setIsShowInfoPopup] = React.useState(false);
  const [isShowDetailPopup, setIsShowDetailPopup] = React.useState(false);
  const [isShowEditDataPopup, setIsShowEditDataPopup] = React.useState(false);
  const [isShowAddUserPopup, setIsShowAddUserPopup] = React.useState(false);
  const [isShowEditUserPopup, setIsShowEditUserPopup] = React.useState(false);
  const [isShowRemoveUserPopup, setIsShowRemoveUserPopup] = React.useState(false);
  
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

  function handleEditData(data) {
    setIsLoadingRequest(true);
    api.editData({ teamId: params.teamId, data: data })
    .then((res) => {
      setCurrentTeam(res);
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    })
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

  function handleEditUser(user) {
    setIsLoadingRequest(true);
    api.editMember({ teamId: params.teamId, data: user })
    .then((res) => {
      const index = currentTeam.members.indexOf(currentTeam.members.find((elem) => (elem.id === res.id)));
      setCurrentTeam({...currentTeam, members: [...currentTeam.members.slice(0, index), res, ...currentTeam.members.slice(index + 1)]});
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingRequest(false);
    })
  }

  function handleRemoveUser(user) {
    setIsLoadingRequest(true);
    api.removeMember({ teamId: params.teamId, data: user })
    .then(() => {
      const newUsers = currentTeam.members.filter((elem) => elem.id !== user.id);
      setCurrentTeam({...currentTeam, members: newUsers});
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
    setIsShowRequestError({ isShow: false, text: '', });
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
      setIsShowRequestError({ isShow: true, text: 'Достигнуто максимальное количество команд!', });
      setIsLoadingRequest(false);
    })
  }

  function getInitialData() {
    setIsLoadingData(true);
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
      
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoadingData(false);
    })
  }

  function showDetailPopup(elem) {
    setCurrentProject(elem);
    setIsShowDetailPopup(true);
  }

  function showInfoPopup() {
    setCurrentProject(currentTeam.participation[0].project);
    setIsShowInfoPopup(true);
  }

  function showEditDataPopup() {
    setIsShowEditDataPopup(true);
  }

  function showAddUserPopup() {
    setIsShowAddUserPopup(true);
  }

  function showEditUserPopup(elem) {
    setCurrentUser(elem);
    setIsShowEditUserPopup(true);
  }

  function showRemoveUserPopup(elem) {
    setCurrentUser(elem);
    setIsShowRemoveUserPopup(true);
  }

  function closePopup() {
    setIsShowRequestError({ isShow: false, text: '', });
    setIsShowDetailPopup(false);
    setIsShowEditDataPopup(false);
    setIsShowAddUserPopup(false);
    setIsShowEditUserPopup(false);
    setIsShowRemoveUserPopup(false);
    setIsShowInfoPopup(false);
  }

  React.useEffect(() => {
    getInitialData();

    return(() => {
      setProjectTags([]);
      setCurrentTag({});
      setCurrentTeam({});
      setCurrentUser({});
      setCurrentProject({});
      setSearchedProjects([]);
    })
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      isLoadingData && currentTeam ?
      <Preloader />
      :
      <div className='wrapper'>
        <div className='project'>
          <div className='container'>
            <div className='project__form'>
              <img className='project__logo' src={logo} alt='лого'></img>

              <h1 className='project__title'>Команда - «{currentTeam.name}»</h1>

              <div className='data__line'>
                <p className='data__text data__text_margin_top'><span className='data__text_font_bold data__text_margin_right'>Учебная группа:</span>{currentTeam.group_name || ''}</p>
                <p className='data__text data__text_margin_top'><span className='data__text_font_bold data__text_margin_right'>Наставник:</span>{currentTeam.tutor_fullname || ''}</p>
                <p className='data__text data__text_margin_top'><span className='data__text_font_bold data__text_margin_right'>Капитан:</span>{currentTeam.captain_fullname || ''}</p>
                <p className='data__text data__text_margin_top'><span className='data__text_font_bold data__text_margin_right'>Предыдущий проект:</span>{currentTeam.previous_project_name || ''}</p>
                <button className='project__member-btn' type='button' onClick={showEditDataPopup}>Редактировать данные</button>
              </div>

              <div className='data__line'>
                <span className='data__text_font_bold'>Выбранный проект</span>
                {
                  currentTeam.participation && currentTeam.participation.length > 0 
                  ?
                  <>
                  <p className='data__text data__text_margin_top'>
                    <span className='data__text_font_bold data__text_margin_right'>Проект:</span>{currentTeam.participation[0].project.name}
                  </p>
                  <button className='project__member-btn' type='button' onClick={showInfoPopup}>Информация о проекте</button>
                  </>
                  :
                  <span className='data__text data__text_type_empty data__text_margin_top'>Проект еще не выбран!</span>
                }
              </div>

              <div className='data__line'>
                <span className='data__text_font_bold'>Участники команды</span>
                <p className='data__text data__text_margin_top'>Добавьте участников в вашу команду.</p>
                <ul className='participant__list'>
                  <li className='participant__item'>
                    <div className='participant__img'></div>
                    <h4 className='participant__name'>{currentTeam.captain_fullname || ''}</h4>
                    <div className='participant__control'>
                      <div className='participant__icon participant__icon-captain' />
                    </div>
                  </li>
                  {
                    currentTeam.members &&
                    currentTeam.members.map((elem, i) => (
                      <li key={i} className='participant__item'>
                        <div className='participant__img'></div>
                        <h4 className='participant__name'>{elem.fullname}</h4>
                        <div className='participant__control'>
                          <div className='participant__icon participant__icon-edit participant__icon-active' onClick={() => showEditUserPopup(elem)} />
                          <div className='participant__icon participant__icon-remove participant__icon-active' onClick={() => showRemoveUserPopup(elem)} />
                        </div>
                      </li>
                    ))
                  }
                </ul>
                {
                  currentTeam.members && currentTeam.members.length < 6 &&
                  <button className='project__member-btn' type='button' onClick={showAddUserPopup}>Добавить участника</button>
                }
                {
                  currentTeam.members && currentTeam.members.length < 3 &&
                  <p className='data__text data__text_margin_top data__text_type_orange'>Рекомендованное количество участников в команде от 4 до 7!</p>
                }
              </div>
            </div>
            <div className='project__main'>
              {
                windowWidth > 833 &&
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
              }
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
      isShowInfoPopup &&
      <InfoPopup 
        isOpen={isShowInfoPopup}
        onClose={closePopup} 
        popupName={'project-info'} 
        project={currentProject} 
      />
    }
    {
      isShowEditDataPopup &&
      <EditDataPopup
        isOpen={isShowEditDataPopup}
        onClose={closePopup} 
        popupName={'edit-data'} 
        data={currentTeam}
        onConfirm={handleEditData}
        isLoadingRequest={isLoadingRequest} 
        isShowRequestError={isShowRequestError}
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
    {
      isShowEditUserPopup &&
      <EditUserPopup 
        isOpen={isShowEditUserPopup}
        onClose={closePopup} 
        popupName={'edit-user'} 
        onConfirm={handleEditUser}
        currentUser={currentUser}
        isLoadingRequest={isLoadingRequest} 
        isShowRequestError={isShowRequestError}
      />
    }
    {
      isShowRemoveUserPopup &&
      <ConfirmRemovePopup
        isOpen={isShowRemoveUserPopup}
        onClose={closePopup} 
        popupName={'remove-user'} 
        onConfirm={handleRemoveUser}
        data={currentUser}
        isLoadingRequest={isLoadingRequest} 
        isShowRequestError={isShowRequestError}
      />
    }
    </>
  )
}

export default Project;  
