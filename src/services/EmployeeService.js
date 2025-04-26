import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3001/employees';

export const getEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  if (!id) {
    throw new Error('Employee ID is required');
  }
  
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    if (!response.data) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

// export const createEmployee = async (employeeData) => {
//   try {
//     // Get current timestamp for ID fallback
//     const timestampId = Date.now();
    
//     // First get all employees to determine the next ID
//     const employees = await getEmployees();
//     const maxId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) : 0;
//     const newId = maxId + 1;

//     const employeeWithId = {
//       ...employeeData,
//       id: newId,
//       // Add creation timestamp
//       createdAt: new Date().toISOString(),
//       // Add fallback ID in case primary ID fails
//       _tempId: timestampId
//     };

//     const response = await axios.post(API_URL, employeeWithId);
    
//     // Double-check the returned data has an ID
//     if (!response.data.id) {
//       console.warn('Server did not return ID, using generated ID');
//       return { ...response.data, id: newId };
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error('Error creating employee:', error);
//     throw error;
//   }
// };

export const createEmployee = async (employeeData) => {
    try {
      // Generate a unique string ID
      const newId = `emp-${uuidv4()}`;
      
      const employeeWithId = {
        ...employeeData,
        id: newId,
        createdAt: new Date().toISOString()
      };
  
      const response = await axios.post(API_URL, employeeWithId);
      
      // Verify the ID was saved correctly
      if (!response.data.id) {
        console.warn('Server did not return ID, using generated ID');
        return { ...response.data, id: newId };
      }
      
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };
export const updateEmployee = async (id, employeeData) => {
  if (!id) {
    throw new Error('Employee ID is required for update');
  }
  
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      ...employeeData,
      updatedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  if (!id) {
    throw new Error('Employee ID is required for deletion');
  }
  
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};