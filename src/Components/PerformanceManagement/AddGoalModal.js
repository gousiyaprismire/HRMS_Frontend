import { useState } from "react";

function AddGoalModal({ onClose, onSave }) {
  const [goalCategory, setGoalCategory] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [isMeasurable, setIsMeasurable] = useState(false);

  const handleSave = () => {
    if (!goalCategory || !goalDescription) {
      alert("Please fill in all required fields.");
      return;
    }
    onSave({ goalCategory, goalDescription, isMeasurable });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Goal</h2>
        <p className="text-gray-600">Performance Appraisal for 2022</p>

        {/* Goal Category Dropdown */}
        <label className="block text-sm font-medium mt-3">Goal Category *</label>
        <select
          className="w-full border p-2 rounded-md mt-1"
          value={goalCategory}
          onChange={(e) => setGoalCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Financial Goals">Financial Goals</option>
          <option value="Operational Goals">Operational Goals</option>
          <option value="Growth Goals">Growth Goals</option>
        </select>

        {/* Goal Description Input */}
        <label className="block text-sm font-medium mt-3">Goal Description *</label>
        <textarea
          className="w-full border p-2 rounded-md mt-1"
          value={goalDescription}
          onChange={(e) => setGoalDescription(e.target.value)}
          placeholder="Enter goal description"
        ></textarea>

        {/* Measurable Goal Toggle */}
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="measurable-goal"
            className="mr-2"
            checked={isMeasurable}
            onChange={() => setIsMeasurable(!isMeasurable)}
          />
          <label htmlFor="measurable-goal">This is a measurable goal</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md mr-2" onClick={onClose}>
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGoalModal;
