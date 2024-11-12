import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './Firebase';

function Sections() {
    const { moduleName } = useParams();
    const [topics, setTopics] = useState([]);
    const [cid, setCid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCid = async () => {
            try {
                const learnerCatRef = collection(db, "Learner_Cat");
                const q = query(learnerCatRef, where("catName", "==", moduleName));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const doc = querySnapshot.docs[0];
                    const retrievedCid = doc.data().cid;
                    console.log("Fetched cid:", retrievedCid); // Debugging line
                    setCid(retrievedCid);
                } else {
                    console.log("No cid found for moduleName:", moduleName); // Debugging line
                    setCid(null);
                }
            } catch (error) {
                console.error("Error fetching cid:", error);
            }
        };
        fetchCid();
    }, [moduleName]);

    useEffect(() => {
        const fetchTopics = async () => {
            if (cid !== null) {
                try {
                    const topicsRef = collection(db, "Topics");
                    const q = query(topicsRef, where("cid", "==", cid));
                    const querySnapshot = await getDocs(q);
                    const fetchedTopics = querySnapshot.docs.map(doc => doc.data().topName);
                    console.log("Fetched topics for cid:", cid, fetchedTopics); // Debugging line
                    setTopics(fetchedTopics);
                } catch (error) {
                    console.error("Error fetching topics:", error);
                }
            }
        };
        fetchTopics();
    }, [cid]);

    const handleButtonClick = (topic) => {
        console.log("Navigating to topic:", topic, "with allTopics:", topics); // Debugging line
        navigate(`/minigame/${encodeURIComponent(topic)}`, { state: { allTopics: topics } });
    };

    return (
        <div>
            <h2>{moduleName}</h2>
            <p style={{ textAlign: "center", fontSize: "20px" }}>Select Topic</p>
            <div className="section_container">
                <div className="section_grid">
                    {topics.map((topName, index) => (
                        <button key={index} className="section_button" onClick={() => handleButtonClick(topName)}>
                            {topName}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sections;
