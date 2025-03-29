import axios from "axios";

const API_URL = "http://localhost:8080/applicants";

export const getApplicants = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return [];
  }
};

export const addApplicant = async (applicant) => {
  try {
    const response = await axios.post(API_URL, applicant);
    return response.data;
  } catch (error) {
    console.error("Error adding applicant:", error);
    return null;
  }
};

export const updateApplicantStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return null;
  }
};

export const deleteApplicant = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting applicant:", error);
    return false;
  }
};
