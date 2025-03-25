import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GeneralOptions.css";

const GeneralOptions = () => {
  const [options, setOptions] = useState({
    goalsBeforeSubmission: true,
    goalsAfterSubmission: true,
    addAchievements: true,
    enable360Feedback: false,
    goalsBeforeSending: false,
    goalsAfterSending: false,
  });

  // Fetch the current options from the backend when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/general-options")
      .then((response) => {
        // Assuming the response contains the options
        setOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  const handleToggle = (option) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const handleSaveChanges = () => {
    axios
      .put("http://localhost:8080/api/general-options", options)
      .then((response) => {
        alert("Changes saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving options:", error);
        alert("There was an error saving the options.");
      });
  };

  return (
    <div className="general-options-container">
      <h2>General Options</h2>
      <p>Configure options for appraisal and feedback</p>

      <div className="options-group">
        <h3>Options for Employees</h3>
        <div className="option-item">
          <span>Goals Before Submission</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.goalsBeforeSubmission}
              onChange={() => handleToggle("goalsBeforeSubmission")}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="option-item">
          <span>Goals After Submission</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.goalsAfterSubmission}
              onChange={() => handleToggle("goalsAfterSubmission")}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="option-item">
          <span>Add Achievements</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.addAchievements}
              onChange={() => handleToggle("addAchievements")}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="option-item">
          <span>Enable 360° Feedback</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.enable360Feedback}
              onChange={() => handleToggle("enable360Feedback")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="options-group">
        <h3>Options for Managers</h3>
        <div className="option-item">
          <span>Goals Before Sending</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.goalsBeforeSending}
              onChange={() => handleToggle("goalsBeforeSending")}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="option-item">
          <span>Goals After Sending</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={options.goalsAfterSending}
              onChange={() => handleToggle("goalsAfterSending")}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <button className="general-options-save-button" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default GeneralOptions;
