// src/InterviewTable.js
import React, { useState } from 'react';
import './InterviewTable.css';
import { HiBars3BottomLeft } from "react-icons/hi2";
import { AiOutlineBars } from "react-icons/ai";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const InterviewTable = () => {
  const [interviews, setInterviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInterview, setNewInterview] = useState({ name: '', status: 'Pending', feedback: '', rating: '' });

  const handleAddInterview = () => {
    setInterviews([...interviews, newInterview]);
    setNewInterview({ name: '', status: 'Pending', feedback: '', rating: '' });
    handleClose();
  };

  const handleClose = () => setIsModalOpen(false);
  const handleShow = () => setIsModalOpen(true);

  const handleStatusChange = (index, newStatus) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index].status = newStatus;

    // Automatically mark as completed if feedback and rating are provided
    if (newStatus === 'Completed' && !updatedInterviews[index].feedback && !updatedInterviews[index].rating) {
      // Show an alert or handle this case as needed
      alert('Feedback and rating are required to complete the interview.');
      updatedInterviews[index].status = 'Pending'; // Revert to Pending
    }

    setInterviews(updatedInterviews);
  };

  const handleFeedbackChange = (index, newFeedback) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index].feedback = newFeedback;
    setInterviews(updatedInterviews);
  };

  const handleRatingChange = (index, newRating) => {
    const updatedInterviews = [...interviews];
    updatedInterviews[index].rating = newRating.toString(); // Ensure rating is stored as a string
    setInterviews(updatedInterviews);
  };

  const handleDelete = (index) => {
    const updatedInterviews = [...interviews];
    updatedInterviews.splice(index, 1);
    setInterviews(updatedInterviews);
  };

  const renderStars = (index) => {
    const rating = interviews[index].rating || 0;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(index, i)}
          className={i <= rating ? 'star selected' : 'star'}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };

  const renderColoredStars = (index) => {
    const rating = interviews[index].rating || 0;
    const coloredStars = [];

    for (let i = 1; i <= 5; i++) {
      coloredStars.push(
        <span
          key={i}
          className={i <= rating ? 'star colored' : 'star'}
        >
          &#9733;
        </span>
      );
    }

    return coloredStars;
  };

  const renderRating = (index) => {
    const rating = interviews[index].rating || 0;
    if (interviews[index].status === 'Pending') {
      return renderStars(index);
    } else if (interviews[index].status === 'Completed') {
      return renderColoredStars(index);
    }
    return rating; // Default to displaying the numeric rating
  };

  return (
    <div className="interview-container">
      <button className="add-button" onClick={handleShow}>
        Add Interview
      </button>

      <table className="interview-table">
        <thead>
          <tr>
            <th><span className='icon'><HiBars3BottomLeft /></span> Name</th>
            <th><span className='icon'><AiOutlineBars /></span>Interview Status</th>
            <th><span className='icon'><HiMiniBars3BottomLeft /></span>Feedback</th>
            <th><span className='icon'><FaRegStar /></span>Rating</th>
            <th><span className='icon'><MdDeleteOutline />
</span>Action</th> {/* New column for delete button */}
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={index}>
              <td>{interview.name}</td>
              <td>
                <select
                  value={interview.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                {interview.status === 'Pending' ? (
                  <input
                    type="text"
                    value={interview.feedback}
                    onChange={(e) => handleFeedbackChange(index, e.target.value)}
                  />
                ) : interview.status === 'Completed' ? (
                  interview.feedback
                ) : null}
              </td>
              <td>
                {interview.status === 'Pending' || interview.status === 'Completed' ? (
                  <div className="star-rating">{renderRating(index)}</div>
                ) : (
                  interview.rating
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h2>Add Interview</h2>
            <div className="form">
              <label>Name:</label>
              <input
                type="text"
                value={newInterview.name}
                onChange={(e) => setNewInterview({ ...newInterview, name: e.target.value })}
              />

              <button onClick={handleAddInterview}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewTable;
