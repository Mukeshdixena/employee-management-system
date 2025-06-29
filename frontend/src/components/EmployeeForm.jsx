import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployeeForm({ selected, onSaved }) {
    const [employee, setEmployee] = useState({ name: '', managerName: '', salary: '' });

    useEffect(() => {
        if (selected) setEmployee(selected);
    }, [selected]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const save = selected
            ? axios.put(`http://localhost:8080/api/employees/${selected.id}`, employee)
            : axios.post("http://localhost:8080/api/employees", employee);

        save.then(() => {
            setEmployee({ name: '', managerName: '', salary: '' });
            onSaved();
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selected ? "Edit Employee" : "Add Employee"}</h2>
            <input name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
            <input name="managerName" value={employee.managerName} onChange={handleChange} placeholder="Manager Name" required />
            <input name="salary" type="number" value={employee.salary} onChange={handleChange} placeholder="Salary" required />
            <button type="submit">{selected ? "Update" : "Add"}</button>
        </form>
    );
}
