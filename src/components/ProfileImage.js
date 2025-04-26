import React from 'react';
import { useDropzone } from 'react-dropzone';

const ProfileImage = ({ imageUrl, onUpload, isUploading }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await onUpload(acceptedFiles[0]);
      }
    }
  });

  return (
    <div className="text-center">
      <div {...getRootProps()} className="profile-image-upload">
        <input {...getInputProps()} />
        <img 
          src={imageUrl} 
          alt="Profile" 
          className="img-thumbnail" 
          style={{ 
            width: '150px', 
            height: '150px', 
            objectFit: 'cover',
            opacity: isUploading ? 0.7 : 1
          }} 
        />
        <div className="overlay">
          {isUploading ? (
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            'Change Photo'
          )}
        </div>
      </div>
      <small className="text-muted d-block mt-2">
        JPG, PNG or GIF (Max 5MB)
      </small>
    </div>
  );
};

export default ProfileImage;