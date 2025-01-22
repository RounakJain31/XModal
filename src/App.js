import React, { useState } from 'react';

function XModal() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Data validation
    if (!username) {
      alert('Please fill in username field.');
      return;
    }

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (phone.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const enteredDate = new Date(dob);
    if (enteredDate > today) {
      alert('Invalid Date of Birth. Please enter a valid date.');
      return;
    }

    // If all validations pass, close the modal
    setShowModal(false);

    // Reset form fields (optional)
    setUsername('');
    setEmail('');
    setPhone('');
    setDob('');
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Form</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
