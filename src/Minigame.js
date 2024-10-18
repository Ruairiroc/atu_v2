import React from "react";
import { useParams } from "react-router-dom";

function Minigame() {

    const {sectionName} = useParams();

    return(
        <div>
            <h2>{sectionName}</h2>

            <div style={{
                width: "300px",
                height: "200px",
                backgroundColor: "#77aad2",
                alignItems: "center",
                justifyContent: "center"
            }}>
                
            </div>
        </div>
    );

}

export default Minigame;