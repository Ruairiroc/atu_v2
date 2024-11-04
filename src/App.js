import './App.css';
//import React from 'react';
import Modules from './Modules';
import './Styles.css';
import NavButton from './nav-button';
import Sections from './Sections';
import Minigame from './Minigame';
import banner from  './ATU_Academic_Writing_Image.jpeg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {db} from './Firebase';
import { addLearnerCat, addTopics, addParaThemes, addParaSentData, addAnswerOptions, testWrite } from './Firebase';
import React, { useEffect } from 'react';

function App() {

  const modules = ['Admin & Office Skill', 'Animal Care', 'Art, Design & Media', 'Arts & Humanities', 'Built Environment', 'Business & Accounting',
   'Childcare', 'Computer & IT Training', 'Couselling & Psychology', 'Crafts & Manual Skills', 'Drama & Acting', 'Education'];

  

   // useEffect to push data to Firestore when the component mounts
   useEffect(() => {
    async function pushDataToFirestore() {
      try {
        await testWrite();
        //await addLearnerCat();
        //await addTopics();
       // await addParaThemes();
       // await addParaSentData();
       // await addAnswerOptions();
        console.log("Data successfully added to Firestore!");
      } catch (error) {
        console.error("Error adding data to Firestore:", error);
      }
    }

    // Call the function to push data to Firestore
    pushDataToFirestore();
  }, []); // Empty dependency array ensures this runs only once on mount


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
