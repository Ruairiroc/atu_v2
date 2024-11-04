//const db = firebase.firestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLMScfPRccYS1t26bRWK0oK8MMQvufSzY",
  authDomain: "atu-academic-writing-game.firebaseapp.com",
  projectId: "atu-academic-writing-game",
  storageBucket: "atu-academic-writing-game.firebasestorage.app",
  messagingSenderId: "402594066923",
  appId: "1:402594066923:web:574827aa40b48f8dc429ae",
  measurementId: "G-6T61MMEK99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


//firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);


async function addLearnerCat() {
  try {
    // Adding data to 'Learner_Cat' collection
    await addDoc(collection(db, "Learner_Cat"), {
      cid: 1,
      catName: "Business Admin",
      subCourse1: "Admin And Office Skills",
      subCourse2: "Office Administration",
      subCourse3: "Office Skills"
    });

    await addDoc(collection(db, "Learner_Cat"), {
      cid: 2,
      catName: "Education",
      subCourse1: "Teaching",
      subCourse2: "Education Management",
      subCourse3: "Primary School Education"
    });

    await addDoc(collection(db, "Learner_Cat"), {
      cid: 3,
      catName: "Hospitality and Tourism",
      subCourse1: "Tourism Skills",
      subCourse2: "Hospitality Management",
      subCourse3: "Tourism Management"
    });

    console.log("Data successfully added!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

addLearnerCat();

//learner Cat
/*db.collection('Learner_Cat').add({
  cid: 1,
  catName: "Business Admin",
  subCourse1: "Admin And Office Skills",
  subCourse2: "Office Administration",
  subCourse3: "Office Skills"
});

db.collection('Learner_Cat').add({
  cid: 2,
  catName: "Education",
  subCourse1: "Teaching",
  subCourse2: "Education Management",
  subCourse3: "Primary School Education"
});

db.collection('Learner_Cat').add({
  cid: 3,
  catName: "Hospitality and Tourism",
  subCourse1: "Tourism Skills",
  subCourse2: "Hospitality Management",
  subCourse3: "Tourism Management"
});
*/

//topics

// Function to add topics to Firestore
async function addTopics() {
  try {
    await addDoc(collection(db, 'Topics'), { tid: 1, topName: "The use of email for office administration", cid: 1 });
    await addDoc(collection(db, 'Topics'), { tid: 2, topName: "Email etiquette", cid: 1 });
    await addDoc(collection(db, 'Topics'), { tid: 3, topName: "Email and GDPR", cid: 1 });
    await addDoc(collection(db, 'Topics'), { tid: 4, topName: "Educational Psychology", cid: 2 });
    await addDoc(collection(db, 'Topics'), { tid: 5, topName: "Special needs Education", cid: 2 });
    await addDoc(collection(db, 'Topics'), { tid: 6, topName: "Education Theory", cid: 2 });
    await addDoc(collection(db, 'Topics'), { tid: 7, topName: "Principles of hospitality Management", cid: 3 });
    await addDoc(collection(db, 'Topics'), { tid: 8, topName: "Rooms management", cid: 3 });
    await addDoc(collection(db, 'Topics'), { tid: 9, topName: "Hospitality teamwork", cid: 3 });

    console.log("Data successfully added to Topics!");
  } catch (error) {
    console.error("Error adding document to Topics: ", error);
  }
}

// Call addTopics to add the topics
addTopics();

async function addParaThemes() {
  const themes = [
    { pid: 1, tid: 1, paraDesc: "Email Etiquette and Professionalism." },
    { pid: 2, tid: 1, paraDesc: "Scheduling and Organising Emails" },
    { pid: 3, tid: 1, paraDesc: "Using Email for collaboration and Teamwork" },
    { pid: 4, tid: 2, paraDesc: "The Impact of Motivation on Student Learning" },
    { pid: 5, tid: 2, paraDesc: "Inclusive Education: Benefits and Challenges" },
    { pid: 6, tid: 2, paraDesc: "The Influence of John Dewey on Modern Education" },
    { pid: 7, tid: 3, paraDesc: "Strategies for Supporting Students with Autism" },
    { pid: 8, tid: 3, paraDesc: "Rooms Management" },
    { pid: 9, tid: 3, paraDesc: "Hospitality teamwork" },
  ];

  try {
    for (const theme of themes) {
      await addDoc(collection(db, "ParaTheme"), theme);
    }
    console.log("All themes added successfully!");
  } catch (error) {
    console.error("Error adding themes: ", error);
  }
}

// Call the function
addParaThemes()


// Function to add data to the 'ParaSent' collection
async function addParaSentData() {
  const paraSentCollection = collection(db, 'ParaSent'); // Reference to the ParaSent collection

  // Array of data to be added
  const data = [
    { sid: 1, pid: 3, sentTxt: "The history of office communication has evolved significantly over the past century.", ansSetId: 1, sentOrd: 1 },
    { sid: 2, pid: 3, sentTxt: "According to Johnson (2021), email has become the most prevalent form of communication in offices (Johnson, 2021).", ansSetId: 5, sentOrd: 4 },
    { sid: 3, pid: 3, sentTxt: "Surveys indicate that 75% of office workers rely on email for daily communication.", ansSetId: 4, sentOrd: 3 },
    { sid: 4, pid: 3, sentTxt: "Smith (2022) states that 60% of employees prefer scheduling emails to be sent at specific times (Smith, 2022).", ansSetId: 9, sentOrd: 5 },
    { sid: 5, pid: 3, sentTxt: "Scheduling and organizing emails, which involves setting up filters, creating folders, and using tools to automate responses, can greatly enhance productivity and ensure that important messages are not overlooked, thereby improving overall communication efficiency in the workplace.", ansSetId: 2, sentOrd: 2 },
    { sid: 6, pid: 4, sentTxt: "The history of motivation in educational settings has been extensively studied over the years.", ansSetId: 10, sentOrd: 1 },
    { sid: 7, pid: 4, sentTxt: "According to Brown (2019), motivation plays a crucial role in student learning (Brown, 2019).", ansSetId: 5, sentOrd: 2 },
    { sid: 8, pid: 4, sentTxt: "Studies show that 80% of students perform better when they are motivated.", ansSetId: 4, sentOrd: 3 },
    { sid: 9, pid: 4, sentTxt: "Johnson (2020) found that 75% of students who are intrinsically motivated achieve higher grades (Johnson, 2020).", ansSetId: 9, sentOrd: 4 },
    { sid: 10, pid: 4, sentTxt: "The impact of motivation on student learning, which encompasses various factors such as intrinsic and extrinsic motivation, goal setting, and self-efficacy, is significant in determining academic success and fostering a positive learning environment, thereby enhancing overall educational outcomes.", ansSetId: 2, sentOrd: 5 },
    { sid: 11, pid: 6, sentTxt: "Education theory encompasses various philosophies and approaches to teaching and learning.", ansSetId: 1, sentOrd: 1 },
    { sid: 12, pid: 6, sentTxt: "Dewey was like, totally into making education more practical and hands-on, you know?", ansSetId: 3, sentOrd: 2 },
    { sid: 13, pid: 6, sentTxt: "Research indicates that 70% of modern educational practices are influenced by Dewey’s theories.", ansSetId: 4, sentOrd: 3 },
    { sid: 14, pid: 6, sentTxt: "john dewey’s impact on education is profound and far-reaching.", ansSetId: 9, sentOrd: 4 },
    { sid: 15, pid: 6, sentTxt: "The pedagogical methodologies promulgated by Dewey, which emphasize experiential learning and critical thinking, have been instrumental in the evolution of contemporary educational paradigms, thereby engendering a transformative impact on pedagogical practices globally.", ansSetId: 2, sentOrd: 5 },
    { sid: 16, pid: 7, sentTxt: "The history of education has seen many changes and developments over the centuries.", ansSetId: 1, sentOrd: 1 },
    { sid: 17, pid: 7, sentTxt: "So, like, when you’re teaching kids with autism, you gotta be super patient and stuff, right?", ansSetId: 3, sentOrd: 3 },
    { sid: 18, pid: 7, sentTxt: "Statistics show that 1 in 54 children are diagnosed with autism.", ansSetId: 4, sentOrd: 2 },
    { sid: 19, pid: 7, sentTxt: "Teachers need to adapt their strategies to meet the needs of autistic students.", ansSetId: 6, sentOrd: 5 },
    { sid: 20, pid: 7, sentTxt: "The implementation of individualized educational plans, which necessitate a multifaceted approach encompassing behavioral, social, and academic interventions, is paramount in fostering an inclusive and supportive learning environment for students with autism in primary education.", ansSetId: 2, sentOrd: 4 },
    { sid: 21, pid: 8, sentTxt: "The history of hotels dates back to ancient times when inns and guesthouses provided lodging for travelers.", ansSetId: 1, sentOrd: 1 },
    { sid: 22, pid: 8, sentTxt: "According to Smith (2021), modern room management systems have revolutionized the hospitality industry (Smith, 2021).", ansSetId: 5, sentOrd: 3 },
    { sid: 23, pid: 8, sentTxt: "Surveys indicate that 90% of hotels use digital room management systems.", ansSetId: 4, sentOrd: 5 },
    { sid: 24, pid: 8, sentTxt: "Johnson (2022) found that 85% of guests prefer hotels with efficient room management systems (Johnson, 2022).", ansSetId: 9, sentOrd: 4 },
    { sid: 25, pid: 8, sentTxt: "Effective room management, which includes tasks such as booking, housekeeping coordination, and maintenance scheduling, is crucial for ensuring guest satisfaction, optimizing occupancy rates, and maintaining operational efficiency, thereby contributing to the overall success of the hotel.", ansSetId: 2, sentOrd: 2 },
    { sid: 26, pid: 9, sentTxt: "The history of hotels dates back to ancient times when inns and guesthouses provided lodging for travelers.", ansSetId: 1, sentOrd: 1 },
    { sid: 27, pid: 9, sentTxt: "According to Brown (2020), teamwork is essential in the hospitality industry (Brown, 2020).", ansSetId: 5, sentOrd: 2 },
    { sid: 28, pid: 9, sentTxt: "Studies show that 85% of successful hospitality operations attribute their success to effective teamwork.", ansSetId: 5, sentOrd: 2 },
    { sid: 29, pid: 9, sentTxt: "Smith (2021) found that 70% of hotel staff believe teamwork improves service quality (Smith, 2021).", ansSetId: 5, sentOrd: 2 },
    { sid: 30, pid: 9, sentTxt: "Effective teamwork in hospitality, which involves clear communication, role delegation, and mutual support among staff members, is crucial for ensuring smooth operations, enhancing guest satisfaction, and fostering a positive work environment, thereby contributing significantly to the overall success and reputation of the establishment.", ansSetId: 2, sentOrd: 5 },
    { sid: 31, pid: 1, sentTxt: "Workplace manners are essential for maintaining a professional environment.", ansSetId: 1, sentOrd: 1 },
    { sid: 32, pid: 1, sentTxt: "According to Smith (2020), proper email etiquette includes using a clear subject line (Smith, 2020).", ansSetId: 5, sentOrd: 5 },
    { sid: 33, pid: 1, sentTxt: "Studies show that 70% of employees believe that email etiquette impacts their perception of professionalism.", ansSetId: 4, sentOrd: 3 },
    { sid: 34, pid: 1, sentTxt: "A survey by Jones (2021) found that 85% of managers consider email tone important (Jones, 2021).", ansSetId: 9, sentOrd: 2 },
    { sid: 35, pid: 1, sentTxt: "When writing emails, it is important to be concise and to the point, avoiding unnecessary details and ensuring that the message is clear and easy to understand, which helps in maintaining professionalism and efficiency in communication.", ansSetId: 2, sentOrd: 4 },
    { sid: 36, pid: 5, sentTxt: "The history of special needs education in Ireland dates back several decades.", ansSetId: 1, sentOrd: 1 },
    { sid: 37, pid: 5, sentTxt: "According to Brown (2019), inclusive education has significantly evolved over the years (Brown, 2019).", ansSetId: 5, sentOrd: 4 },
    { sid: 38, pid: 5, sentTxt: "The pedagogical methodologies employed in inclusive education necessitate a multifaceted approach to accommodate diverse learning needs.", ansSetId: 7, sentOrd: 5 },
    { sid: 39, pid: 5, sentTxt: "As per the findings of John (2020), inclusive education promotes social integration (John, 2020).", ansSetId: 8, sentOrd: 3 },
    { sid: 40, pid: 5, sentTxt: "Inclusive education, which aims to integrate all students regardless of their physical, intellectual, social, emotional, linguistic, or other conditions, into mainstream education, is essential for fostering a more equitable and just society, but it requires significant resources, training, and commitment from all stakeholders involved.", ansSetId: 2, sentOrd: 2 },
    { sid: 41, pid: 2, sentTxt: "The history of computers has evolved significantly over the past few decades.", ansSetId: 1, sentOrd: 1 },
    { sid: 42, pid: 2, sentTxt: "According to Johnson (2021), effective email scheduling can greatly enhance productivity (Johnson, 2021).", ansSetId: 5, sentOrd: 5 },
    { sid: 43, pid: 2, sentTxt: "The intricacies involved in the systematic organisation of electronic mail necessitate a profound comprehension of both temporal and spatial management paradigms.", ansSetId: 7, sentOrd: 3 },
    { sid: 44, pid: 2, sentTxt: "As per the research conducted by Emily (2022), organising emails into folders can reduce stress (Emily, 2022).", ansSetId: 8, sentOrd: 2 },
    { sid: 45, pid: 2, sentTxt: "Scheduling emails, which involves planning the timing of sending and receiving messages to ensure that communication is both timely and efficient, is a critical skill that can help professionals manage their workload more effectively and avoid the pitfalls of email overload, which can lead to decreased productivity and increased stress levels.", ansSetId: 2, sentOrd: 4 },
    

  ];

  // Loop through each item and add it to Firestore
  for (const item of data) {
    try {
      await addDoc(paraSentCollection, item);
      console.log(`Document added for sid: ${item.sid}`);
    } catch (error) {
      console.error(`Error adding document for sid ${item.sid}: `, error);
    }
  }
}


//ans options


async function addAnswerOptions() {
  const answerOptions = [
    {
      ansSetId: 1,
      ansSetDesc: "There is no Topic Sentence",
      correctAns: "Clear topic sentence needed.",
      incorrectAns1: "The first sentence needs to be dramatic.",
      incorrectAns2: "Check capitalisation.",
      incorrectAns3: "No academic writing mistakes.",
      feedbackWrong: "Each paragraph should start with a topic sentence. This sentence introduces the paragraph by highlighting the main topic that will be discussed.",
      feedbackCorrect: "Well done. You correctly spotted that a topic sentence was needed.",
    },
    {
      ansSetId: 2,
      ansSetDesc: "Sprawling sentence causes lack of clarity",
      correctAns: "Sprawling sentence. Break sentence into two.",
      incorrectAns1: "Paragraph has no theme.",
      incorrectAns2: "No academic writing mistakes.",
      incorrectAns3: "Check capitalisation.",
      feedbackWrong: "A sprawling sentence is grammatically correct but can be tricky to understand because it isn’t concise. It should often be broken down into two or more sentences to make it clearer.",
      feedbackCorrect: "Well done. You saw that this sentence was too long and complex.",
    },
    {
      ansSetId: 3,
      ansSetDesc: "Informal writing",
      correctAns: "Use a formal tone.",
      incorrectAns1: "No academic writing mistakes.",
      incorrectAns2: "Topic sentence needed.",
      incorrectAns3: "Incorrect capitalisation.",
      feedbackWrong: "A formal tone is commonly used in research papers and reports. It involves writing objectively, using precise language and details, and steering clear of conversational phrasing.",
      feedbackCorrect: "Well done. You saw that this style of writing was too informal for academic work.",
    },
    {
      ansSetId: 4,
      ansSetDesc: "Citation needed",
      correctAns: "Insert Citation.",
      incorrectAns1: "Paragraph has no theme.",
      incorrectAns2: "No academic writing mistakes.",
      incorrectAns3: "Check capitalisation.",
      feedbackWrong: "Always cite your sources whenever you use research, words, ideas, data, or information that isn’t your own.",
      feedbackCorrect: "Well done. You spotted that a fact or quote had been included in this sentence but a citation was needed to show where it came from.",
    },
    {
      ansSetId: 5,
      ansSetDesc: "Double citation",
      correctAns: "Double cited: Remove one of the citations.",
      incorrectAns1: "Use the author's surname",
      incorrectAns2: "Overly complex. Simplify language.",
      incorrectAns3: "No academic writing mistakes.",
      feedbackWrong: "The citation has been included twice. If you have used the author(s) and citation as part of the sentence then you should not repeat the citation at the end of the sentence. Remove the citation at the end of the sentence.",
      feedbackCorrect: "Well done. You saw that there was no need for the second citation.",
    },
    {
      ansSetId: 6,
      ansSetDesc: "Incorrect word form used",
      correctAns: "The right word but the wrong version has been used.",
      incorrectAns1: "No academic writing mistakes.",
      incorrectAns2: "The right word but the wrong version has been used.",
      incorrectAns3: "Check capitalisation.",
      feedbackWrong: "One of the most common mistakes in academic writing is using a word that sounds similar but has a different meaning. Some words may sound alike and have similar meanings, but they can’t be used interchangeably. For example, ‘there’ and ‘their'.",
      feedbackCorrect: "Well done. You spotted the wrong form of the word had been used.",
    },
    {
      ansSetId: 7,
      ansSetDesc: "Overly complex language",
      correctAns: "Overly complex. Simplify language.",
      incorrectAns1: "No academic writing mistakes.",
      incorrectAns2: "Insert Citation.",
      incorrectAns3: "Use a formal tone.",
      feedbackWrong: "Another common mistake in academic writing is using overly complex language. While big words and complicated phrases might seem impressive, they can actually make your article harder to read and understand.",
      feedbackCorrect: "Well done. You saw that a simplified language would have made the writing clearer.",
    },
    {
      ansSetId: 8,
      ansSetDesc: "Incorrect capitalisation",
      correctAns: "Incorrect capitalisation.",
      incorrectAns1: "No academic writing mistakes.",
      incorrectAns2: "Overly complex. Simplify language.",
      incorrectAns3: "Use a formal tone.",
      feedbackWrong: "Insert Citation.",
      feedbackCorrect: "Well done. You spotted the mistake with capitalisation.",
    },
    {
      ansSetId: 9,
      ansSetDesc: "Spelling mistake",
      correctAns: "Spelling mistake.",
      incorrectAns1: "Use a formal tone.",
      incorrectAns2: "No academic writing mistakes.",
      incorrectAns3: "Insert Citation.",
      feedbackWrong: "There was a spelling mistake. Always carefully run a spell checker.",
      feedbackCorrect: "Well done. You spotted the spelling mistake.",
    },
    {
      ansSetId: 10,
      ansSetDesc: "Topic Sentence correctly used",
      correctAns: "The topic sentence is correctly used and appropriate for the paragraph",
      incorrectAns1: "Topic sentence needed.",
      incorrectAns2: "Paragraph has no theme.",
      incorrectAns3: "Insert Citation",
      feedbackWrong: "Topic sentence was correctly used. No other academic writing mistake.",
      feedbackCorrect: "Well done. You have correctly identified the topic sentence.",
    },
    {
      ansSetId: 11,
      ansSetDesc: "No mistake in this sentence",
      correctAns: "There is no mistake in this sentence",
      incorrectAns1: "Topic sentence needed.",
      incorrectAns2: "The right word but the wrong version has been used.",
      incorrectAns3: "Overly complex. Simplify language.",
      feedbackWrong: "There was nothing wrong with this sentence from an academic writing point of view.",
      feedbackCorrect: "Well done. There is no mistake in this sentence",
    },
    {
      ansSetId: 12,
      ansSetDesc: "Concluding statement correctly used",
      correctAns: "Concluding statement correctly used",
      incorrectAns1: "Paragraph has no theme.",
      incorrectAns2: "A sprawling sentence is grammatically correct but can be tricky to understand because it isn’t concise. It should often be broken down into two or more sentences to make it clearer.",
      incorrectAns3: "Check capitalisation.",
      feedbackWrong: "A concluding statement was correctly used. No other academic writing mistake.",
      feedbackCorrect: "Well done. You correctly identified that a concluding statement was used in the right context.",
    },
  ];

  try {
    for (const option of answerOptions) {
      await addDoc(collection(db, "AnsOptions"), option);
    }
    console.log("All answer options added successfully!");
  } catch (error) {
    console.error("Error adding answer options: ", error);
  }
}

// Call the function
addAnswerOptions();




async function testWrite() {
  try {
    await setDoc(doc(db, "TestCollection", "testDoc"), {
      testField: "testValue"
    });
    console.log("Test write successful!");
  } catch (error) {
    console.error("Test write error: ", error);
  }
}

testWrite();



export {db, addLearnerCat, addTopics, addParaThemes, addParaSentData, addAnswerOptions, testWrite, app };