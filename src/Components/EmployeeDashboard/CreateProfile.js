import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeDashboard.css';

const CreateProfile = () => {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [cert1File, setCert1File] = useState(null);
  const [cert2File, setCert2File] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('employeeData');
    if (saved) {
      const parsed = JSON.parse(saved);
      setInitialValues(parsed);
      setIsUpdate(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newEmployee = {
      name: form.name.value,
      empId: form.empId.value,
      dob: form.dob.value,
      gender: form.gender.value,
      maritalStatus: form.maritalStatus.value,
      nationality: form.nationality.value,
      email: form.email.value,
      type: form.type.value,
      designation: form.designation.value,
      serviceAge: form.serviceAge.value,
      boss: form.boss.value,
      department: form.department.value,
      currentSalary: form.currentSalary.value,
      joiningSalary: form.joiningSalary.value,
      lastIncrement: form.lastIncrement.value,
      avgSalary: form.avgSalary.value,
      maxSalary: form.maxSalary.value,
      education: form.education.value,
      cert1: cert1File?.name || '',
      cert2: cert2File?.name || '',
    };

    localStorage.setItem('employeeData', JSON.stringify(newEmployee));
    alert('Profile saved successfully!');
    navigate('/employee-dashboard');
  };

  return (
    <div className="create-profile-container">
      <h2 className="create-profile-title">{isUpdate ? 'Update Employee Profile' : 'Create Employee Profile'}</h2>

      <div className="create-profile-button-container">
        <button type="button" className="create-profile-back-button" onClick={() => navigate('/employee-dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

     <form className="create-profile-form" onSubmit={handleSubmit}>
  <div>
    <label>Employee ID</label>
    <input name="empId" defaultValue={initialValues.empId || ''} required />
  </div>

  <div>
    <label>Name</label>
    <input name="name" defaultValue={initialValues.name || ''} required />
  </div>

  <div>
    <label>Date of Birth</label>
    <input name="dob" type="date" defaultValue={initialValues.dob || ''} />
  </div>

  <div>
    <label>Gender</label>
    <select name="gender" defaultValue={initialValues.gender || ''}>
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div>
    <label>Marital Status</label>
    <select name="maritalStatus" defaultValue={initialValues.maritalStatus || ''}>
      <option value="">Select Marital Status</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
    </select>
  </div>

  <div>
    <label>Nationality</label>
    <input name="nationality" defaultValue={initialValues.nationality || ''} />
  </div>

  <div>
    <label>Email</label>
    <input name="email" type="email" defaultValue={initialValues.email || ''} />
  </div>

  <div>
    <label>Job Type</label>
    <select name="type" defaultValue={initialValues.type || ''}>
      <option value="">Select Job Type</option>
      <option value="Full Time">Full Time</option>
      <option value="Part Time">Part Time</option>
      <option value="Contract">Contract</option>
    </select>
  </div>

  <div>
    <label>Designation</label>
    <input name="designation" defaultValue={initialValues.designation || ''} />
  </div>

  <div>
    <label>Service Age</label>
    <input name="serviceAge" defaultValue={initialValues.serviceAge || ''} />
  </div>

  <div>
    <label>Reporting Boss</label>
    <input name="boss" defaultValue={initialValues.boss || ''} />
  </div>

  <div>
    <label>Department</label>
    <select name="department" defaultValue={initialValues.department || ''}>
      <option value="">Select Department</option>
      <option value="IT">IT</option>
      <option value="HR">HR</option>
      <option value="Finance">Finance</option>
      <option value="Marketing">Marketing</option>
    </select>
  </div>

  <div>
    <label>Current Salary</label>
    <input name="currentSalary" defaultValue={initialValues.currentSalary || ''} />
  </div>

  <div>
    <label>Joining Salary</label>
    <input name="joiningSalary" defaultValue={initialValues.joiningSalary || ''} />
  </div>

  <div>
    <label>Last Increment</label>
    <input name="lastIncrement" defaultValue={initialValues.lastIncrement || ''} />
  </div>

  <div>
    <label>Average Salary</label>
    <input name="avgSalary" defaultValue={initialValues.avgSalary || ''} />
  </div>

  <div>
    <label>Max Salary</label>
    <input name="maxSalary" defaultValue={initialValues.maxSalary || ''} />
  </div>

  <div>
    <label>Highest Education</label>
    <input name="education" defaultValue={initialValues.education || ''} />
  </div>

  <div>
    <label>Upload Certification 1 (PDF)</label>
    <input type="file" accept=".pdf" onChange={(e) => setCert1File(e.target.files[0])} />
    {cert1File && <p>Selected: {cert1File.name}</p>}
  </div>

  <div>
    <label>Upload Certification 2 (PDF)</label>
    <input type="file" accept=".pdf" onChange={(e) => setCert2File(e.target.files[0])} />
    {cert2File && <p>Selected: {cert2File.name}</p>}
  </div>

  <div className="create-profile-button-container">
    <button type="submit" className="create-profile-save-button">
      {isUpdate ? 'Update Profile' : 'Save'}
    </button>
  </div>
</form>

    </div>
  );
};

export default CreateProfile;
