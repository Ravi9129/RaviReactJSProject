import React, { useState, useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import ProfileForm from '../../components/ProfileForm';
import ProfileImage from '../../components/ProfileImage';
import { updateUser } from '../../services/UserService';

const UserProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const updatedUser = await updateUser(user.id, updatedData);
      updateProfile(updatedUser);
      setSuccess('Profile updated successfully!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleImageUpload = async (imageFile) => {
    try {
      setIsUploading(true);
      setError('');
      
      // In a real app, upload to server here
      // For demo, we'll just use a mock filename
      const filename = `profile-${Date.now()}.jpg`;
      
      // Update user profile with new image
      const updatedUser = await updateUser(user.id, { 
        profileImage: filename 
      });
      
      updateProfile(updatedUser);
      setSuccess('Profile image updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <ProfileImage 
                imageUrl={user?.profileImage ? `/default-profile.jpg` : '/default-profile.jpg'} 
                onUpload={handleImageUpload}
                isUploading={isUploading}
              />
              <h3 className="mt-3">{user?.username}</h3>
              <p className="text-muted">{user?.email}</p>
              <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2>Profile Settings</h2>
              {error && (
                <div className="alert alert-danger alert-dismissible fade show">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError('')}></button>
                </div>
              )}
              {success && (
                <div className="alert alert-success alert-dismissible fade show">
                  {success}
                  <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                </div>
              )}
              <ProfileForm user={user} onSubmit={handleUpdateProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;