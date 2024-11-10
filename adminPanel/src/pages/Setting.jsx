import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Setting.css';

function Setting() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImages, setEditedImages] = useState([]);
  const [editedType, setEditedType] = useState('');
  const [editedLanguage, setEditedLanguage] = useState('');
  const [editedFramework, setEditedFramework] = useState('');
  const [editedWebsite, setEditedWebsite] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
      setSuccessMessage('Item deleted successfully!'); // Show success message after deletion
      setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setEditedTitle(item.title);
    setEditedPrice(item.price);
    setEditedDescription(item.description);
    setEditedImages(item.images || []);
    setEditedType(item.type || '');
    setEditedLanguage(item.language || '');
    setEditedFramework(item.framework || '');
    setEditedWebsite(item.website || '');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedTitle('');
    setEditedPrice('');
    setEditedDescription('');
    setEditedImages([]);
    setEditedType('');
    setEditedLanguage('');
    setEditedFramework('');
    setEditedWebsite('');
  };

  const handleSaveEdit = async (id) => {
    const formData = new FormData();
    formData.append('title', editedTitle);
    formData.append('description', editedDescription);
    formData.append('type', editedType);
    formData.append('language', editedLanguage);
    formData.append('framework', editedFramework);
    formData.append('website', editedWebsite);

    // Append edited images to formData
    editedImages.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.put(`http://localhost:3000/api/items/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const updatedItem = response.data;
      setItems(items.map(item => (item._id === id ? updatedItem : item)));
      setSuccessMessage('Item updated successfully!'); // Show success message after update
      setTimeout(() => setSuccessMessage(''), 3000); // Hide success message after 3 seconds
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredItems = items.filter(item => 
      (item.title && item.title.toLowerCase().includes(searchTerm)) ||
      (item.description && item.description.toLowerCase().includes(searchTerm))
    );
    setItems(filteredItems);
  };

  return (
    <div className="setting-page">
      <h2>Admin Settings</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search items"
        className="search-input"
      />
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      <h3>Items List</h3>
      {items.length > 0 ? (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item._id} className="item">
              <div className="item-images">
                {item.images && item.images.length > 0 ? (
                  item.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:3000${image}`}
                      alt={item.description}
                      className="item-image"
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>

              {editingItem === item._id ? (
                <div className="item-details">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="text"
                    value={editedType}
                    onChange={(e) => setEditedType(e.target.value)}
                    placeholder="Type"
                  />
                  <input
                    type="text"
                    value={editedLanguage}
                    onChange={(e) => setEditedLanguage(e.target.value)}
                    placeholder="Language"
                  />
                  <input
                    type="text"
                    value={editedFramework}
                    onChange={(e) => setEditedFramework(e.target.value)}
                    placeholder="Framework"
                  />
                  <input
                    type="url"
                    value={editedWebsite}
                    onChange={(e) => setEditedWebsite(e.target.value)}
                    placeholder="Website URL"
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditedImages([...editedImages, e.target.files[0]])}
                    accept="image/*"
                    multiple
                  />
                  <button onClick={() => handleSaveEdit(item._id)} className="save-btn">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="item-details">
                  <p><strong>Title:</strong> {item.title}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Type:</strong> {item.type}</p>
                  <p><strong>Language:</strong> {item.language}</p>
                  <p><strong>Framework:</strong> {item.framework}</p>
                  <p><strong>Website:</strong> <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a></p>
                  <button onClick={() => handleEditClick(item)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}

export default Setting;
