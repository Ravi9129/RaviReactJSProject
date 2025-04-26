import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return <div className="alert alert-info">No users found</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                  {user.role}
                </span>
              </td>
              <td>
                <Link to={`/profile/${user.id}`} className="btn btn-info btn-sm me-2">
                  View
                </Link>
                <button className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;