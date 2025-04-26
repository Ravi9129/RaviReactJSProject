import React from 'react';
import { useForm } from 'react-hook-form';

const EmployeeForm = ({ employee, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: employee || {
      name: '',
      email: '',
      phone: '',
      department: 'IT',
      position: '',
      salary: '',
      joinDate: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>

      <div className="mb-3">
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

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
          {...register('phone', { 
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Phone must be 10 digits'
            }
          })}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <select
          className={`form-select ${errors.department ? 'is-invalid' : ''}`}
          {...register('department', { required: 'Department is required' })}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Position</label>
        <input
          type="text"
          className={`form-control ${errors.position ? 'is-invalid' : ''}`}
          {...register('position', { required: 'Position is required' })}
        />
        {errors.position && <div className="invalid-feedback">{errors.position.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Salary</label>
        <input
          type="number"
          className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
          {...register('salary', { 
            required: 'Salary is required',
            min: {
              value: 0,
              message: 'Salary must be positive'
            }
          })}
        />
        {errors.salary && <div className="invalid-feedback">{errors.salary.message}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Join Date</label>
        <input
          type="date"
          className={`form-control ${errors.joinDate ? 'is-invalid' : ''}`}
          {...register('joinDate', { required: 'Join date is required' })}
        />
        {errors.joinDate && <div className="invalid-feedback">{errors.joinDate.message}</div>}
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {employee ? 'Update' : 'Create'} Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;