import axios from 'axios'
import React, { useState } from 'react'
import './Report.css'; 

const Report = () => {
  const [email, setEmail] = useState('');
  const [report_text, setReportText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();

      axios.post('http://localhost:8080/report', {
        email: email,
        report_text: report_text
      })
      .then((response) => {
        console.log(response.status);
      })
      .catch((error) => {
        console.log(error);
      })

      setEmail('');
      setReportText('');
      setIsOpen(false);
  }

  return (
    <div>
      <button className='report_button' onClick={() => setIsOpen(!isOpen)}>Report a problem</button>

      {isOpen && (
        <div className="report_form">
          <h2>Report a problem</h2>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <textarea
            value={report_text}
            onChange={(e) => setReportText(e.target.value)}
            placeholder="Enter your comment" 
            required 
          />
          <button onClick={handleSubmit}>Submit Comment</button>
        </div>
      )}
    </div>
  );
}

export default Report;
