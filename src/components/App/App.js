import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Project from '../Project/Project.js';

function App() { 

  const { pathname } = useLocation();
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
      function resizeWindow (evt) {
        setWindowWidth(evt.target.innerWidth);
      }
      window.addEventListener('resize', resizeWindow);
      return () => {
        window.removeEventListener('resize', resizeWindow);
      }
    }, []);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth])

  function appHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--vh', (window.innerHeight*.01) + 'px');
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  window.addEventListener('resize', appHeight);
  appHeight();

  return (
    <div className='page'>
      <Routes>
        <Route path='/teams/:teamId' element={
          <Project />
        }/>
      </Routes> 
    </div>
  );
}

export default App; 
