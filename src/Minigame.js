import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation} from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './Firebase';

function Minigame() {
  const { sectionName: topName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const allTopics = location.state?.allTopics || []; // List of all topics from `Sections`

  const [cid, setCid] = useState(null);
  const [paraThemes, setParaThemes] = useState([]);
  const [tid, setTid] = useState(null);
  const [paraDesc, setParaDesc] = useState("");
  const [pid, setPid] = useState(null);
  const [paraSentData, setParaSentData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState(allTopics);

  const [isReady, setIsReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState([]);
  const [feedback, setFeedback] = useState("");

  const [sections, setSections] = useState(allTopics);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(allTopics.indexOf(topName));

  useEffect(() => {
    console.log("All topics from location.state:", allTopics);
    console.log("Initial sections state:", sections);
    console.log("topName from params:", topName);
}, [sections, allTopics]);

  useEffect(() => {
    if (allTopics.length > 0) {
        setSections(allTopics);
        setCurrentSectionIndex(allTopics.indexOf(topName));
        console.log("Updated sections state:", allTopics); // Debugging line
    }
}, [allTopics, topName]);


  useEffect(() => {
    console.log("topName from params:", topName); // Debugging
    const fetchTid = async () => {
      const topicRef = collection(db, "Topics");
      const q = query(topicRef, where("topName", "==", topName));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const retrievedTid = doc.data().tid;
        const retrievedCid = doc.data().cid;
        setTid(retrievedTid);
        setCid(retrievedCid);
      } else {
        setTid(null);
        setCid(null); // Reset if not found
        console.log("No matching topic found for:", topName); // Debugging
      }
    };
    fetchTid();
  }, [topName]);

  useEffect(() => {
    const fetchSections = async () => {
      if (cid !== null) {
        console.log("Fetching sections for cid:", cid);
        const sectionsRef = collection(db, "Topics");
        const q = query(sectionsRef, where("cid", "==", cid));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const fetchedSections = querySnapshot.docs.map(doc => doc.data().topName);
          console.log("Sections fetched:", fetchedSections);
          setSections(fetchedSections);
          
          const index = fetchedSections.indexOf(topName);
          setCurrentSectionIndex(index);
          console.log("Current Section Index set to:", index);
        } else {
          console.log("No sections found for this tid.");
        }
      }
    };
  
    if (cid !== null) {
      fetchSections();
    }
  }, [cid, topName]);
  

  useEffect(() => {
    // Fetch paraDesc and pid once tid is available
    const fetchParaDesc = async () => {
      if (tid !== null) {
        console.log("Fetching paraDesc for tid:", tid); // Log tid
        const paraThemesRef = collection(db, "ParaTheme");
        const q = query(paraThemesRef, where("tid", "==", tid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setParaDesc(doc.data().paraDesc);
          console.log("Fetched paraDesc:", doc.data().paraDesc); // Log paraDesc

          const retrievedPid = doc.data().pid;
          setPid(retrievedPid);
        }
        else{
          console.log("No matching ParaTheme found for tid:", tid);
        }
      }
    };
    fetchParaDesc();
  }, [tid]);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Fetch paraSent data once pid is available
    const fetchParaSentData = async () => {
      if (pid) {
        console.log("Fetching paraSentData for pid:", pid); // Log pid

        const paraSentRef = collection(db, "ParaSent");
        const q = query(paraSentRef, where("pid", "==", pid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const fetchedParaSentData = querySnapshot.docs.map(doc => doc.data());
          const sortedParaSentData = fetchedParaSentData.sort((a, b) => a.sentOrd - b.sentOrd);
          setParaSentData(sortedParaSentData);
          console.log("Fetched and sorted paraSentData:", sortedParaSentData); // Log paraSentData


          const newQuestions = [];
          for (let i = 0; i < sortedParaSentData.length; i++) {
            const item = sortedParaSentData[i];
            const ansOptionsRef = collection(db, "AnsOptions");
            const qAnsOptions = query(ansOptionsRef, where("ansSetId", "==", item.ansSetId));
            const ansOptionsSnapshot = await getDocs(qAnsOptions);

            if (!ansOptionsSnapshot.empty) {
              const ansOptionsDoc = ansOptionsSnapshot.docs[0].data();
              const options = [
                ansOptionsDoc.correctAns,
                ansOptionsDoc.incorrectAns1,
                ansOptionsDoc.incorrectAns2,
                ansOptionsDoc.incorrectAns3,
              ];

              const shuffledOptions = shuffleArray(options);

              newQuestions.push({
                sentence: item.sentTxt,
                options: shuffledOptions,
                correct: shuffledOptions.indexOf(ansOptionsDoc.correctAns),
                feedbackCorrect: ansOptionsDoc.feedbackCorrect,
                feedbackWrong: ansOptionsDoc.feedbackWrong,
              });
            }
          }
          setQuestions(newQuestions);
          setIsCorrect(Array(newQuestions.length).fill(null)); // Initialize isCorrect state
        }
        else{
          console.log("No paraSentData found for pid:", pid);
        }
      }
    };
    fetchParaSentData();
  }, [pid]);

  const handleStart = () => {
    setIsReady(true);
    setFeedback("");
  };

  const handleAnswerClick = (index) => {
    if (questions.length > 0) {
      const correctAnswerIndex = questions[currentIndex].correct;
      const feedbackMessage =
        index === correctAnswerIndex
          ? questions[currentIndex].feedbackCorrect
          : questions[currentIndex].feedbackWrong;

      setFeedback(feedbackMessage);

      setIsCorrect((prev) => {
        const newCorrect = [...prev];
        newCorrect[currentIndex] = index === correctAnswerIndex;
        return newCorrect;
      });
    }
  };

  const handleProceed = () => {
    const nextIndex = currentIndex + 1;
  
    if (nextIndex < questions.length) {
      // Proceed to next sentence within the same section
      setCurrentIndex(nextIndex);
      setFeedback("");  // Clear feedback for the next question
    } else {
      // After completing all sentences in the current section, move to the next section
      setFeedback("You've completed all of the sentences!");
      handleNextSection();  // This handles the section change
    }
  };

  const handleRetry = () => {
    const lastIncorrectIndex = isCorrect.lastIndexOf(false);
    if (lastIncorrectIndex !== -1) {
      setCurrentIndex(lastIncorrectIndex);
      setFeedback("");
      setIsCorrect((prev) => {
        const newCorrect = [...prev];
        newCorrect[lastIncorrectIndex] = null;
        return newCorrect;
      });
    }
  };

  const handleNextSection = () => {
    if (!sections || sections.length === 0) {
      console.log("Sections are still loading...");
      return; // Prevent navigation if sections are not yet fetched
    }
  
    // If there are more sections, navigate to the next one
    if (currentSectionIndex + 1 < sections.length) {
      const nextSection = sections[currentSectionIndex + 1];
      console.log("Navigating to next section:", nextSection);
  
      setCurrentSectionIndex(currentSectionIndex + 1);  // Update to next section index
      setCurrentIndex(0);  // Reset currentIndex for the new section
      setIsCorrect([]);    // Reset the answers correctness
      setFeedback("");     // Clear the feedback
      navigate(`/minigame/${nextSection}`, { state: { allTopics: topics } });  // Navigate to the next section
    } else {
      // If no more sections, navigate to the homepage
      alert("You've completed all sections!");
      navigate("/");  // Redirect to the homepage or a summary page
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div>
      <h2>{topName}</h2>
  
      <div style={{ width: "100%", maxWidth: "900px", height: "auto", backgroundColor: "#77aad2", margin: "auto", padding: "20px", marginBottom: "20px", textAlign: "left", overflowY: "auto" }}>
        <h2>{paraDesc}</h2>
  
        <p
          style={{
            display: isReady ? "block" : "none",
            margin: "10px 0",
            fontSize: "16px",
            lineHeight: "1.5",
            padding: "5px",
            overflowWrap: "break-word",
            wordWrap: "break-word",
            textAlign: "left",
          }}
        >
          {/* Merge all sentences into one paragraph */}
          {paraSentData.map((sentence, index) => (
            <span
              key={index}
              style={{
                backgroundColor: currentIndex === index ? "yellow" : "transparent", // Highlight current sentence
                fontWeight: currentIndex === index ? "bold" : "normal", // Bold current sentence
              }}
            >
              {sentence.sentTxt}{" "}
            </span>
          ))}
        </p>
      </div>
  
      {feedback && (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <p>{feedback}</p>
        </div>
      )}
  
      <div style={{ width: "1000px", height: "400px", backgroundColor: "#77aad2", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {!isReady ? (
          <button style={{ padding: "10px 20px" }} className="minigame_button" onClick={handleStart}>
            Begin
          </button>
        ) : (
          <div>
            <div className="minigame_grid">
              {questions[currentIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  className="minigame_button"
                  onClick={() => handleAnswerClick(index)}
                  disabled={isCorrect[currentIndex] !== null}
                >
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
                ) : (
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
