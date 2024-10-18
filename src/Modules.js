import React from "react";
import './Styles.css';
import { useNavigate } from "react-router-dom";

function Modules({modules}){

    const navigate = useNavigate();

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