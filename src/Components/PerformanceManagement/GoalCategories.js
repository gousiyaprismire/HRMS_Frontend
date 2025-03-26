import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./GoalCategories.css";

const GoalCategories = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const apiUrl = "http://localhost:8080/api/goal_categories"; 

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  const handleSave = async () => {
    if (categoryName.trim()) {
      const newCategory = { name: categoryName, description };

      if (editIndex !== null) {
        const categoryId = categories[editIndex].id;
        try {
          await axios.put(`${apiUrl}/${categoryId}`, newCategory);
          fetchCategories(); 
        } catch (error) {
          console.error("Error updating category:", error);
        }
      } else {
        try {
          await axios.post(apiUrl, newCategory);
          fetchCategories(); 
        } catch (error) {
          console.error("Error creating category:", error);
        }
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
    setConfirmDelete(index);
  };

  const confirmDeleteAction = async () => {
    const categoryId = categories[confirmDelete].id;
    try {
      await axios.delete(`${apiUrl}/${categoryId}`);
      fetchCategories(); 
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setConfirmDelete(null);
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
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button className="goal-categories-delete-btn" onClick={() => handleDelete(index)}>Delete</button>
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

      {confirmDelete !== null && (
        <div className="goal-categories-modal-overlay">
          <div className="goal-categories-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="goal-categories-modal-actions">
              <button onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="goal-categories-delete-btn" onClick={confirmDeleteAction}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCategories;
