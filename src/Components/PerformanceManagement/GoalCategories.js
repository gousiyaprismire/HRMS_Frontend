import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoalCategories.css";

const GoalCategories = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddClick = () => {
    setShowModal(true);
    setEditIndex(null);
    setCategoryName("");
    setDescription("");
  };

  const handleClose = () => {
    setShowModal(false);
    setCategoryName("");
    setDescription("");
  };

  const handleSave = () => {
    if (categoryName.trim()) {
      if (editIndex !== null) {
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = { name: categoryName, description };
        setCategories(updatedCategories);
      } else {
        setCategories([...categories, { name: categoryName, description }]);
      }
      handleClose();
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCategoryName(categories[index].name);
    setDescription(categories[index].description);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="goal-categories-container">
      <div className="breadcrumb">
        <span onClick={() => navigate(-1)}>⬅ Performance Management</span> / Goal Categories
      </div>
      <h1 className="goal-categories-heading">Goal Categories</h1>
      <p className="goal-categories-para">Add or edit categories to measure goals and performance</p>
      
      <div className="goal-categories-table-container">
        <table className="goal-categories-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Descriptions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="goal-categories-no-data">No Categories Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <button className="goal-categories-add-btn" onClick={handleAddClick}>➕ Add</button>
      
      {showModal && (
        <div className="goal-categories-modal-overlay">
          <div className="goal-categories-modal">
            <h2>{editIndex !== null ? "Edit Category" : "Add Category"}</h2>
            <label>Name *</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="goal-categories-modal-actions">
              <button onClick={handleClose}>Close</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCategories;
