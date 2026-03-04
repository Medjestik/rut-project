import React from 'react';
import './View.css';
import '../Section/Section.css';
import * as api from '../../utils/api.js';
import ViewList from './ViewList.js';
import Search from '../Search/Search.js';
import PopupSelect from '../Popup/PopupSelect/PopupSelect.js';
import Preloader from '../Preloader/Preloader.js';
import DetailPopup from '../Popup/DetailPopup/DetailPopup.js';

function View({ windowWidth }) { 

  const [projects, setProjects] = React.useState([]);
  const [searchedProjects, setSearchedProjects] = React.useState([]);
  const [currentProject, setCurrentProject] = React.useState({});

  const [projectTags, setProjectTags] = React.useState([]);
  const [currentTag, setCurrentTag] = React.useState({});

  const [isShowDetailPopup, setIsShowDetailPopup] = React.useState(false);
  
  const [isLoadingData, setIsLoadingData] = React.useState(true);

  function handleSearchProject(data) {
    setSearchedProjects(data);
    setCurrentTag({id: 'empty', name: 'Выберите категорию..'});
  }

    function handleChangeTag(option) {
    setCurrentTag(option);
    if (option.id === 'empty') {
      setSearchedProjects(projects);
    } else {
      const filterProjects = projects.filter((elem) => 
        elem.tags.some(tag => tag.id === option.id)
      );
      setSearchedProjects(filterProjects);
    }
  }

  function getProjects() {
    setIsLoadingData(true);
    Promise.all([
      api.getProjects(),
      api.getTags(),
    ])
    .then(([projects, tags]) => {
      setProjects(projects);
      setSearchedProjects(projects);
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

  function closePopup() {
    setIsShowDetailPopup(false);
  }

  React.useEffect(() => {
    getProjects();

    return(() => {
      setProjectTags([]);
      setCurrentTag({});
      setCurrentProject({});
      setProjects([]);
      setSearchedProjects([]);
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
                      <Search type='large' id='project-search' data={projects} onSearch={handleSearchProject} />
                    </div>
                  </div>
                </div>
              }
              <ViewList searchedPrograms={searchedProjects} onShow={showDetailPopup} />
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
        onConfirm={() =>{}} 
        project={currentProject} 
        isLoadingRequest={false} 
      />
    }
    </>
  )
}

export default View;  
