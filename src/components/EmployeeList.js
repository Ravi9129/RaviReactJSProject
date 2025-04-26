import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = ({ employees, onDelete, showActions = true }) => {
  if (!employees || employees.length === 0) {
    return <div className="alert alert-info">No employees found</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>${employee.salary.toLocaleString()}</td>
              {showActions && (
                <td>
                  <Link to={`/employees/${employee.id}`} className="btn btn-info btn-sm me-2">View</Link>
                  <Link to={`/employees/edit/${employee.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                  <button 
                    onClick={() => onDelete(employee.id)} 
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;