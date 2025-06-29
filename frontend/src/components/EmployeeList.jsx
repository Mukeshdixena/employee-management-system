import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList({ onEdit, reload }) {
    const [employees, setEmployees] = useState([]);

    const loadEmployees = () => {
        axios.get("http://localhost:8080/api/employees")
            .then(res => setEmployees(res.data));
    };

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:8080/api/employees/${id}`)
            .then(loadEmployees);
    };

    useEffect(() => {
        loadEmployees();
    }, [reload]); // 👈 make sure reload triggers refetch

    return (
        <div>
            <h2>Employee List</h2>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manager</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.managerName}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => onEdit(emp)}>Edit</button>
                                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
