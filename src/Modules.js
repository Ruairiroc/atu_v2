import React from "react";
import './Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from './Firebase';

function Modules(){
    const [modules, setModules] = useState([]); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const learnerCatRef = collection(db, "Learner_Cat");
                const querySnapshot = await getDocs(learnerCatRef);

                const fetchedModules = querySnapshot.docs.map(doc => doc.data().catName);

                setModules(fetchedModules);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        };

        fetchModules();
    }, []);

    const handleNavigation = (module) => {
            navigate(`/sections/${encodeURIComponent(module)}`)
    }

    //test
    return (
        <div className="modules_container">
            <div className="module_grid">
                {modules.map((module, index) => (
                    <button key={index} className="module_button" onClick={() => handleNavigation(module)}>
                        {module}
                    </button> 
                ))}
            </div>
        </div>
    );
}

export default Modules;