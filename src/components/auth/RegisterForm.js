import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? 'is-invalid' : ''}`}
          id="username"
          {...register('username', { required: 'Username is required' })}
        />
        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
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

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })}
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          id="confirmPassword"
          {...register('confirmPassword', { 
            required: 'Please confirm your password',
            validate: value => value === watch('password') || 'Passwords do not match'
          })}
        />
        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;