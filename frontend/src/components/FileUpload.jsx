// FileUpload.jsx
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
    const [dragging, setDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
       
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
           
            onFileUpload(file);
        } else {
            alert('Only PDF and image files are allowed.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            onFileUpload(file);
        } else {
            alert('Only PDF and image files are allowed.');
        }
    };

    return (
        <div
            className={`upload-area ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <p>Drag and drop your file here, or click to upload</p>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default FileUpload;
