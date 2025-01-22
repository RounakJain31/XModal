import React, { useState } from "react";
import './index.css'; // Assuming your CSS is in index.css

const ModalForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  // Handle opening the modal
  const openModal = () => setIsModalOpen(true);

  // Handle closing the modal when clicking outside
  const closeModal = (e) => {
    if (e.target.className === "modal") {
      setIsModalOpen(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const { username, email, phone, dob } = formData;

    if (!username) errors.username = "Username is required";
    if (!email) errors.email = "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email. Please check your email address.";
    }
    if (!phone) errors.phone = "Phone number is required";
    if (phone && !/^\d{10}$/.test(phone)) {
      errors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
    }
    if (!dob) errors.dob = "Date of birth is required";
    if (dob && new Date(dob) > new Date()) {
      errors.dob = "Invalid date of birth. Please enter a valid past date.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
      setIsModalOpen(false);
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      setFormErrors({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
    }
  };

  return (
    <div className="app">
      <button onClick={openModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {formErrors.username && <span className="error">{formErrors.username}</span>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <span className="error">{formErrors.email}</span>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {formErrors.phone && <span className="error">{formErrors.phone}</span>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                {formErrors.dob && <span className="error">{formErrors.dob}</span>}
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
