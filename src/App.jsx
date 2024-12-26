import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import UserForm from './components/UserForm'
import Question from './components/Question'
import Results from './components/Results'
import { UserProvider } from './components/UserContext'

function App() {
  const [count, setCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What's your favourite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"]
    },
    {
      question: "What's your favourite season?",
      options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Autumn 🍂"]
    },
    {
      question: "What's your favourite animal?",
      options: ["Lion 🦁", "Dolphin 🐬", "Elephant 🐘", "Eagle 🦅"]
    }
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Summer ☀️": "Fire",
    "Winter ❄️": "Water",
    "Spring 🌸": "Earth",
    "Autumn 🍂": "Air",
    "Lion 🦁": "Fire",
    "Dolphin 🐬": "Water",
    "Elephant 🐘": "Earth",
    "Eagle 🦅": "Air",
  };

  function handleAnswer(answer){
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name){
    setUserName(name);
  }

  function determineElement(answers){
    const counts={};
    answers.forEach((answer)=>{
       const element = elements[answer];
       counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce((a,b)=>counts[a]>counts[b]?a:b)
  }

  async function fetchArtwork(element) {
    try {
      const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
      if (!res.ok) {
        throw new Error("Problem fetching data");
      }
      const data = await res.json();
      setArtwork(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <>
      <Header/>
      <UserProvider>
        <Routes>
          <Route path="/" exact element={<UserForm onSubmit={handleUserFormSubmit} />} />
          <Route
            path="/quiz"
            exact
            element={
              currentQuestionIndex < questions.length ? (
                <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
              ) : (
                <Results element={element} artwork={artwork}/>
              )
            }
          />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
