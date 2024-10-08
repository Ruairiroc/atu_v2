import React from "react";
import { useNavigate, useParams } from "react-router-dom";


function Sections(){

    const {moduleName} = useParams();
    const sectionOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const navigate = useNavigate();

    const handleButtonClick = (section) => {
        navigate(`/minigame/${encodeURIComponent(section)}`); 
    };

    return (
        <div>
            <h2>{moduleName}</h2>
            <p style={{textAlign: "center", fontSize: "20px"}}>Select Section</p>

            <div className="section_container">
                <div className="section_grid">
                    {sectionOptions.map((section, index) => (
                    <button key={index} className="section_button" onClick={() => handleButtonClick(section)}>
                        {section}
                    </button>
                    ))}
                </div>
            </div>


        </div>
      );
}

export default Sections;