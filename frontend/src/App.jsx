import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  const [selected, setSelected] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <EmployeeForm selected={selected} onSaved={() => {
        setSelected(null);
        setReload(!reload);
      }} />
      <hr />
      <EmployeeList onEdit={setSelected} reload={reload} />
    </div>
  );
}

export default App;
