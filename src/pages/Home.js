import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import { getEmployees, deleteEmployee } from '../services/EmployeeService';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Management</h2>
        <Link to="/employees/create" className="btn btn-success">Add New Employee</Link>
      </div>
      {employees.length === 0 ? (
        <div className="alert alert-info">No employees found. Please add a new employee.</div>
      ) : (
        <EmployeeList employees={employees} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;