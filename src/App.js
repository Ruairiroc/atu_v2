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
import { addLearnerCat, addTopics, addParaThemes, addParaSentData, addAnswerOptions } from './Firebase.js';
import React, { useEffect, useRef, useState } from 'react';


import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {

  const modules = ['Admin & Office Skill', 'Animal Care', 'Art, Design & Media', 'Arts & Humanities', 'Built Environment', 'Business & Accounting',
   'Childcare', 'Computer & IT Training', 'Couselling & Psychology', 'Crafts & Manual Skills', 'Drama & Acting', 'Education'];
     const initialized = useRef(false);  
  /* const [newName, setNewName] = useState("");
  const [newMarks, setNewMarks] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, marks: Number(newMarks) });
    getUsers();
  };

  const updateUser = async (id, marks) => {
    const userDoc = doc(db, "users", id);
    const newFields = { marks: marks + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers();
  }, []);

  */

   async function test1 (){

    try {
         
      // await addLearnerCat();
       //await addTopics();
       //await addParaThemes();
       //await addParaSentData();
       //await addAnswerOptions();
     console.log("Data successfully added to Firestore!");
   } catch (error) {
     console.error("Error adding data to Firestore:", error);
   }


  }

   // useEffect to push data to Firestore when the component mounts
   useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      console.log("hello world");
   
      test1();
    }
    
    

    // Call the function to push data to Firestore
  
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

  /*return (
    <div className="App">
    <div className="FormHolder">
      <input
        type="text"
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Marks..."
        onChange={(event) => {
          setNewMarks(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>
      </div>
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h1>Name: {user.name}</h1>
            <h1>Marks: {user.marks}</h1>
            <button onClick={() => updateUser(user.id, user.marks)}>
              Increase Marks
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
    </div>
  );
  */
  
}



export default App;
