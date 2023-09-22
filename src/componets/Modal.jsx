import React, { useState } from "react";
import styles from "./Modal.module.css";

const FeedbackModal = () => {
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }
    if (name.length < 2 || name.length > 15) {
      setError("Name should be between 2 and 15 characters");
      return;
    }
    if (!comment) {
      setError("Please provide a comment");
      return;
    }
    const data = {
      rating,
      name,
      comment,
    };
    setSubmittedData(data);

    // Reset form fields
    setRating("");
    setName("");
    setComment("");
    setError("");
  };

  const handleOk = () => {
    setSubmittedData(null);
    setOpen(false);
  };

  return (
    <div>
      {/* Product display */}
      <h1>Give Your Feedback</h1>
      {/* Button to open the feedback comment popup */}
      <button onClick={() => setOpen(true)}>Leave Feedback</button>

      {/* Feedback comment popup */}
      {open && (
        <div className={styles.popup}>
          <form onSubmit={handleSubmit}>
            <h2>Feedback Comment</h2>
            {/* Rating */}
            <div>
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            {/* Your name */}
            <div>
              <label htmlFor="name">Your name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Comment */}
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* Error message */}
            {error && <p className={styles.error}>{error}</p>}
            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {/* Display submitted data */}
      {submittedData && (
        <div className={styles.popup}>
          <h2>Thank you for your feedback!</h2>
          <p>Rating: {submittedData.rating}</p>
          <p>Name: {submittedData.name}</p>
          <p>Comment: {submittedData.comment}</p>
          <button onClick={handleOk}>OK</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackModal;
