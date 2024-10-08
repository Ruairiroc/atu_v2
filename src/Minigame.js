import React from "react";
import { useParams } from "react-router-dom";

function Minigame() {

    const {sectionName} = useParams();

    return(
        <div>
            <h2>{sectionName}</h2>
            <p style={{textAlign: "center", fontSize: "20px"}}>Select Section</p>
        </div>
    );

}

export default Minigame;