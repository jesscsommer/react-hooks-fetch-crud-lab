import React from "react";

function QuestionItem({ question, removeQuestion, updateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
  }

  const handleChange = (e, id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'correctIndex': e.target.value
      })
    })
    .then(res => res.json())
    .then(data => updateQuestion(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={(e) => handleChange(e, id)} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={() => {
        handleDelete(id)
        removeQuestion(id)
        }}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
