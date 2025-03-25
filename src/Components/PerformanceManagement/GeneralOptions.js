import React, { useState } from "react";
import "./GeneralOptions.css";

const GeneralOptions = () => {
    const [options, setOptions] = useState({
        goalsBeforeSubmission: true,
        goalsAfterSubmission: true,
        addAchievements: true,
        enable360Feedback: false,
        goalsBeforeSending: false,
        goalsAfterSending: false
    });

    const handleToggle = (option) => {
        setOptions({ ...options, [option]: !options[option] });
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

            <button className="general-options-save-button">Save Changes</button>
        </div>
    );
};

export default GeneralOptions;
