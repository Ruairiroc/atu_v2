import './App.css';
import React from 'react';
import Modules from './Modules';
import './Styles.css';
import NavButton from './nav-button';
import Sections from './Sections';
import Minigame from './Minigame';
import banner from  './ATU_Academic_Writing_Image.jpeg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const modules = ['Admin & Office Skill', 'Animal Care', 'Art, Design & Media', 'Arts & Humanities', 'Built Environment', 'Business & Accounting',
   'Childcare', 'Computer & IT Training', 'Couselling & Psychology', 'Crafts & Manual Skills', 'Drama & Acting', 'Education'];

  return (
    <Router>
      <div className='Styles'>
        <h1>
          <NavButton />
          ATU Academic Writing WebApp
        </h1>

        <Routes>
          <Route path="/" element={
              <div>
                <div className='banner'>
                  <img src={banner} alt="ATU Academic Writing WebApp Banner" />
                </div>
                <Modules modules={modules} />
              </div>
            } 
          />

          <Route path="/sections/:moduleName" element={<Sections />} />
          <Route path="/minigame/:sectionName" element={<Minigame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
