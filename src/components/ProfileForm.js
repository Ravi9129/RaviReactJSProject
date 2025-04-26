import React from 'react';
import { useForm } from 'react-hook-form';

const ProfileForm = ({ user, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: user || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Bio</label>
        <textarea
          className="form-control"
          rows="3"
          {...register('bio')}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </div>
    </form>
  );
};

export default ProfileForm;