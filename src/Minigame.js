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
                margin: "auto",
                paddingLeft:"250px",
                paddingRight:"250px",
                paddingBottom: "200px",
                marginBottom: "20px"
            }}>
                
            </div>

            <div style={{
                width: "1000px",
                height: "400px",
                backgroundColor: "#77aad2",
                margin: "auto",
            }}>

            </div>
        </div>
    );

}

export default Minigame;