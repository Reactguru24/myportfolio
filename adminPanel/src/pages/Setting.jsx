import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Setting.css';

function Setting() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedTitle, setEditedTitle] = useState(''); 
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedImage, setEditedImage] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');  // State for search term

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://myportfolio-backend-f448.onrender.com/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://myportfolio-backend-f448.onrender.com/api/items/${id}`);
      setItems(items.filter(item => item._id !== id)); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setEditedTitle(item.title);
    setEditedPrice(item.price);
    setEditedDescription(item.description);
    setEditedImage(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditedTitle('');
    setEditedPrice('');
    setEditedDescription('');
    setEditedImage(null);
  };

  const handleSaveEdit = async (id) => {
    const formData = new FormData();
    formData.append('title', editedTitle);
    formData.append('price', editedPrice);
    formData.append('description', editedDescription);
    if (editedImage) formData.append('image', editedImage);
  
    try {
      const response = await axios.put(`https://myportfolio-backend-f448.onrender.com/api/items/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const updatedItem = response.data;
      setItems(items.map(item => (item._id === id ? updatedItem : item)));
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter items based on search
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
      <h3>Items List</h3>
      {items.length > 0 ? (
        <ul className="items-list">
          {items.map((item) => (
            <li key={item._id} className="item">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.description}
                className="item-image"
              />
              {editingItem === item._id ? (
                <div className="item-details">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    placeholder="Price"
                  />
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    placeholder="Description"
                  />
                  <input
                    type="file"
                    onChange={(e) => setEditedImage(e.target.files[0])}
                    accept="image/*"
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
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Description:</strong> {item.description}</p>
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
