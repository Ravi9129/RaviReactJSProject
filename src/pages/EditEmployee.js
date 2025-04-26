import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Employee ID is missing');
      setLoading(false);
      return;
    }

    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        if (!data) {
          throw new Error(`Employee with ID ${id} not found`);
        }
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (employeeData) => {
    try {
      if (!id) {
        throw new Error('Employee ID is missing');
      }

      await updateEmployee(id, {
        ...employeeData,
        updatedBy: user.id,
        updatedAt: new Date().toISOString()
      });
      
      setSuccess('Employee updated successfully!');
      setError(null);
      
      setTimeout(() => {
        navigate(`/employees/${id}`);
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update employee');
      setSuccess(null);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
          <button 
            className="btn btn-secondary ms-3"
            onClick={() => navigate('/employees')}
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>Edit Employee</h2>
        </div>
        <div className="card-body">
          {success && <div className="alert alert-success">{success}</div>}
          {employee && (
            <EmployeeForm 
              employee={employee} 
              onSubmit={handleSubmit} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;