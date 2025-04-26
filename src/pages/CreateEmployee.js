import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import EmployeeForm from '../components/EmployeeForm';
import { createEmployee } from '../services/EmployeeService';

const CreateEmployee = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [createdId, setCreatedId] = useState(null);

  const handleSubmit = async (employeeData) => {
    try {
      setError(null);
      setSuccess(null);
      
      // Add creator information
      const completeEmployeeData = {
        ...employeeData,
        createdBy: user.id,
        creatorName: user.username
      };

      const newEmployee = await createEmployee(completeEmployeeData);
      
      // Store the ID for display
      setCreatedId(newEmployee.id);
      setSuccess('Employee created successfully!');
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/employees');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create employee');
      console.error('Creation error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>Create New Employee</h2>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger">
              {error}
              <button 
                className="btn btn-secondary ms-3"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              <strong>{success}</strong>
              {createdId && (
                <div className="mt-2">
                  Employee ID: <strong>{createdId}</strong>
                </div>
              )}
            </div>
          )}
          
          <EmployeeForm 
            onSubmit={handleSubmit} 
            disabled={!!success} // Disable form after successful submission
          />
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;