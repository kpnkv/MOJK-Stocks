import React, { useState } from "react";
import "./contact.css";
import axios from "axios"; 
import Navbar from "../../components/Navbar/Navbar"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // post request to the backend 
      const response = await axios.post("http://localhost:8080/contact", formData);

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      const errorResponse = error.response?.data?.message || "Failed to send message.";
      setErrorMessage(errorResponse);
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container">
        <h2>Contact Us</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;