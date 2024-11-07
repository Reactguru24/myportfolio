import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('testimonials');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch testimonials from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then(response => response.json())
      .then(data => setTestimonials(data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  const addTestimonial = () => {
    const wordCount = newMessage.trim().split(/\s+/).length;
    if (wordCount > 15) {
      alert('Message should not exceed 15 words.');
      return;
    }

    const newTestimonial = {
      avatar: newImage || 'https://via.placeholder.com/50',
      name: newName || 'Anonymous',
      message: newMessage,
    };

    fetch('http://localhost:5000/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTestimonial),
    })
      .then(response => response.json())
      .then(savedTestimonial => {
        setTestimonials([savedTestimonial, ...testimonials]);
        setNewMessage('');
        setNewName('');
        setNewImage(null);
        setSuccessMessage('Comment successfully uploaded!'); // Set success message

        // Clear the success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error("Error adding testimonial:", error));
  };

  return (
    <div className="testimonials" id="testimonials">
      <h2>Testimonials</h2>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('testimonials')} className={activeTab === 'testimonials' ? 'active' : ''}>
          View Testimonials
        </button>
        <button onClick={() => setActiveTab('comment')} className={activeTab === 'comment' ? 'active' : ''}>
          Add Comment
        </button>
      </div>

      {activeTab === 'testimonials' && (
        <div className="testimonial-list">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial._id} className="testimonial-item">
              <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
              <div>
                <p className="name">{testimonial.name}</p>
                <p className="message">"{testimonial.message}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'comment' && (
        <div className="testimonial-input">
          {successMessage && <p className="success-message">{successMessage}</p>}
          <input
            type="text"
            placeholder="Your name (optional)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <textarea
            placeholder="Add your testimonial (max 15 words)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={addTestimonial}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
