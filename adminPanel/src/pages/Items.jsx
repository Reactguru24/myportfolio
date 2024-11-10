import React, { useState } from 'react';
import axios from 'axios';
import './Items.css';  // Make sure you have your CSS for styling

function Items() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: [],
    feature: '',
    type: '',
    language: '',
    framework: '',
    website: '', // Added website field
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle change in text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Please select up to 5 images only.');
      return;
    }
    setFormData({ ...formData, images: files });
    setImagePreviews(files.map((file) => URL.createObjectURL(file))); // Preview images
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append form data and files to FormData
    formData.images.forEach((image) => formDataToSend.append('images', image));
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('feature', formData.feature);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('language', formData.language);
    formDataToSend.append('framework', formData.framework);
    formDataToSend.append('website', formData.website); // Added website field to FormData

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3000/api/items', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Item added:', response.data);
      setSuccessMessage('Item added successfully!');
      setErrorMessage('');  // Clear any previous error message

      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        images: [],
        feature: '',
        type: '',
        language: '',
        framework: '',
        website: '', // Reset website field
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('Error adding item:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding item, please try again.');
    }
  };

  return (
    <div className="items-page">
      <h2>Add Project</h2>
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

        {/* Image File Upload */}
        <div className="form-group">
          <label htmlFor="images">Images (up to 5)</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            multiple
            accept="image/*"  // Ensure only image files are allowed
            required
          />
          {imagePreviews.length > 0 && (
            <div className="image-previews">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} className="preview-img" />
              ))}
            </div>
          )}
        </div>

        {/* Feature Select */}
        <div className="form-group">
          <label htmlFor="feature">Feature</label>
          <select
            id="feature"
            name="feature"
            value={formData.feature}
            onChange={handleChange}
            required
          >
            <option value="">Select a feature</option>
            <option value="cart">Cart</option>
            <option value="checkout">Checkout</option>
            <option value="user authentication">User Authentication</option>
            <option value="product listing">Product Listing</option>
          </select>
        </div>

        {/* Type Select */}
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="client side">Client Side</option>
            <option value="server side">Server Side</option>
            <option value="client side + admin">Client Side + Admin</option>
          </select>
        </div>

        {/* Language Select */}
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            <option value="">Select a language</option>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
          </select>
        </div>

        {/* Framework Select */}
        <div className="form-group">
          <label htmlFor="framework">Framework</label>
          <select
            id="framework"
            name="framework"
            value={formData.framework}
            onChange={handleChange}
            required
          >
            <option value="">Select a framework</option>
            <option value="react">React</option>
            <option value="node.js">Node.js</option>
            <option value="express">Express</option>
          </select>
        </div>

        {/* Website URL Input */}
        <div className="form-group">
          <label htmlFor="website">Website URL</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <button type="submit">Add Project</button>
      </form>

      {/* Success or Error Message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Items;
