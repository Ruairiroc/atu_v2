import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Minigame() {

    const {sectionName} = useParams();
    const navigate = useNavigate();

    const sections = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']; // Define all sections
    const currentSectionIndex = sections.indexOf(sectionName);

    const questions = [
        {
          sentence: "This is the highlighted first sentence.",
          options: ["Spelling mistake", "Grammar issue", "Too informal", "Correct sentence"],
          correct: 2, // Correct answer is "Too informal"
        },
        {
          sentence: "He don't know what to do.",
          options: ["Subject-verb agreement", "Tense error", "Punctuation issue", "Spelling mistake"],
          correct: 0, // Correct answer is "Subject-verb agreement"
        },
      ];

    const [isReady, setIsReady] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(Array(questions.length).fill(null));
    const [feedback, setFeedback] = useState("");


    const handleStart = () => {
        setIsReady(true);
        //setIsCorrect(null);
        setFeedback("");
    }

    const handleAnswerClick = (index) => {
        const correctAnswerIndex = questions[currentIndex].correct;
        if (index === correctAnswerIndex) {
          setFeedback("Correct! You can proceed to the next sentence.");
          setIsCorrect((prev) => {
            const newCorrect = [...prev];
            newCorrect[currentIndex] = true;
            return newCorrect;
          }); 
        } else {
          setFeedback("Incorrect! Please retry.");
          setIsCorrect((prev) => {
            const newCorrect = [...prev];
            newCorrect[currentIndex] = false;
            return newCorrect;
          });
        }
      };

      const handleProceed = () => {
        const nextIndex = currentIndex + 1;
        
            if(nextIndex < questions.length){
                setCurrentIndex(nextIndex);
                setFeedback(""); 
            }
            else{
                setFeedback("You've completed all of the sentences!"); 
            }
            };


      const handleRetry = () => {
        const lastIncorrectIndex = isCorrect.lastIndexOf(false);

        if(lastIncorrectIndex !== 1){
            setCurrentIndex(lastIncorrectIndex);
        }
        setFeedback(""); 
        setIsCorrect((prev) => {
            const newCorrect = [...prev];
            newCorrect[lastIncorrectIndex] = null;
            return newCorrect;
        }); 
      };

      const handleNextSection = () => {
        if (currentSectionIndex + 1 < sections.length) {
            const nextSection = sections[currentSectionIndex + 1];
            setCurrentIndex(0); // Reset to the first question
            setIsCorrect(Array(questions.length).fill(null)); // Reset correctness
            setFeedback("");
            navigate(`/minigame/${encodeURIComponent(nextSection)}`); // Navigate to the next section
          } else {
            // If there are no more sections, you can redirect or show a message
            alert("You have completed all sections!"); // Or navigate to a summary page
            navigate(`/summary`); // Assuming you have a summary page
          } 
      };

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
                marginBottom: "20px",
                textAlign: "center",
                }}>

                {questions.map((question, index) => (

                <p style={{display: isReady ? "block" : "none",}}>
                <span style={{ backgroundColor: currentIndex === index ? "yellow" : "transparent",
                 fontWeight: currentIndex === index ? "bold": "normal" }}>
                {question.sentence}
                </span>
                </p>

                ))}

            </div>

            {feedback && (
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
            <p>{feedback}</p>
            </div>
            )}

            <div style={{
                width: "1000px",
                height: "400px",
                backgroundColor: "#77aad2",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                {!isReady ? (
                    <button 
                    style={{padding: "10px 20px"}}
                    className="minigame_button" 
                    onClick={handleStart}>Begin</button>
                ) : (

                <div>
                    <div className= "minigame_grid">
                        {questions[currentIndex]?.options.map((option, index) => (
                            <button 
                            key={index}
                            className="minigame_button"
                            onClick={() => handleAnswerClick(index)}
                            disabled={isCorrect[currentIndex] !== null}>
                                {option}
                            </button>
                        ))}
                    </div>

                    {isCorrect[currentIndex] === true && (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            {currentIndex + 1 < questions.length ? (
                            <button className="minigame_button" onClick={handleProceed}>
                                Proceed to Next Sentence
                            </button>
                            ):(
                            <button className="minigame_button" onClick={handleNextSection}>
                                Proceed to Next Section
                            </button>
                            )}

                        </div>
                    )}

                    {isCorrect[currentIndex] === false && (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                          <button className="minigame_button" onClick={handleRetry}>
                            Retry
                          </button>
                        </div>
                      )}
                </div>

                )}

            </div> 
        </div>
    );

}

export default Minigame;