import React, { useState } from 'react';
import axios from 'axios';
import './Items.css';  // Import the stylesheet

function Items() {
  // State to hold form data, including the title
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: '',
    description: '',
  });

  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file change and set preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Create a preview of the selected image
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
  };

  // Handle form submission to send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data (including the image file)
    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('title', formData.title); // Append title to the form data

    try {
      const response = await axios.post('https://myportfolio-backend-f448.onrender.com/api/items', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Item added:', response.data);

      // Set success message
      setSuccessMessage('Item added successfully!');

      // Clear the form after submission
      setFormData({
        title: '',
        image: '',
        price: '',
        description: '',
      });
      setImagePreview(null);  // Reset image preview
    } catch (error) {
      console.error('Error adding item:', error);
      setSuccessMessage('Error adding item, please try again.'); // Optionally handle errors
    }
  };

  return (
    <div className="items-page">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Input */}
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            required
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Image Preview" className="preview-img" />
            </div>
          )}
        </div>

        {/* Price Input */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Item</button>
      </form>

      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Items;
