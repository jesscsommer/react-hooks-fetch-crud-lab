import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [questions])

  const addQuestion = (newQ) => {
    setQuestions(questions => [...questions, newQ])
  }

  const removeQuestion = (oldQ) => {
    setQuestions(questions => questions.filter(q => q.id !== oldQ.id))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} removeQuestion={removeQuestion}/>}
    </main>
  );
}

export default App;
