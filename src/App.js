import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [key, setKey] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [titles, setTitles] = useState([]);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/scrape/?key=${key}&api_key=${apiKey}`);
      setTitles(response.data.titles);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Amazon Parser</h1>
      <div className="form">
        <label>Keyword:</label>
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        <label>API Key:</label>
        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <div className="result">
        <h3>{message}</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {titles.map((title, index) => (
              <tr key={index}>
                <td>{title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

