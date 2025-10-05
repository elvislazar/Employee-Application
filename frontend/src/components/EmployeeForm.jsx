import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/employees", form);
      alert("Employee added successfully!");
      navigate("/employees");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding employee");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
        />
        <button type="submit" className="save-button">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
