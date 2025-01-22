import React, { useState } from "react";

const XModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    // Check if any field is empty
    for (let field in formData) {
      if (!formData[field]) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    }

    // Validate Email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Invalid email. Please check your email address.";
    }

    // Validate Phone Number
    if (formData.phone && (!/^\d{10}$/.test(formData.phone))) {
      formErrors.phone = "Invalid phone number. Please enter a 10-digit phone number.";
    }

    // Validate Date of Birth
    if (formData.dob && new Date(formData.dob) > new Date()) {
      formErrors.dob = "Invalid date of birth. Please enter a past date.";
    }

    // If there are any errors, display them
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      alert("Form Submitted Successfully");
      // Close modal and reset form
      handleCloseModal();
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      setErrors({});
    }
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <div className="error">{errors.username}</div>}
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>

              <button className="submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
