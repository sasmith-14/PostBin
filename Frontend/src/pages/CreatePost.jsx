import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CreatePost = () => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first!");

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);

    try {
      const res = await fetch('http://localhost:3000/post', {
        method: 'POST',
        body: formData,
      });
      
      if (res.ok) {
        // Redirect back to the feed automatically!
        navigate('/');
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <aside className="upload-section centered">
      <div className="card glass">
        <h2>Create a Post</h2>
        <p className="subtitle">Share your moments with the world.</p>
        
        <form onSubmit={handleSubmit} className="upload-form">
          
          <div className="file-input-wrapper">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              id="file-upload"
              className="hidden-input"
            />
            <label htmlFor="file-upload" className={`file-label ${file ? 'has-file' : ''}`}>
              <span className="upload-icon">⬆</span>
              {file ? file.name : "Click to select an image"}
            </label>
          </div>

          {file && (
            <div className="image-preview">
              <img src={URL.createObjectURL(file)} alt="Preview" />
            </div>
          )}

          <textarea 
            placeholder="Write a catchy caption..." 
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="3"
            className="caption-input"
          />

          <button 
            type="submit" 
            className={`submit-btn ${isUploading ? 'loading' : ''}`}
            disabled={isUploading || !file}
          >
            {isUploading ? "Uploading..." : "Post to Feed"}
          </button>
        </form>
      </div>
    </aside>
  );
};

export default CreatePost;
