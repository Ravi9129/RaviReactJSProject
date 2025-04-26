import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeView = ({ employee }) => {
  if (!employee) return <div>Loading...</div>;

  return (
    <div className="card mt-4">
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
          <Link to={`/edit/${employee.id}`} className="btn btn-warning">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;