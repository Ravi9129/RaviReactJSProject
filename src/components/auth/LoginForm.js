import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="email"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="password"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;