import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../services/EmployeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;
  if (!employee) return <div className="alert alert-info mt-4">Employee not found</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Employee Details</h3>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <h5>Basic Information</h5>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
            </div>
            <div className="col-md-6">
              <h5>Professional Information</h5>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Salary:</strong> ${employee.salary.toLocaleString()}</p>
              <p><strong>Join Date:</strong> {new Date(employee.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link to="/" className="btn btn-secondary">Back to List</Link>
            <Link to={`/employees/edit/${employee.id}`} className="btn btn-warning">Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;