import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Paginas/Login';
import CrearCuenta from './Paginas/CrearCuenta';
import Home from './Paginas/Home';
import AgregarActualizar from './Paginas/AgregarActualizar';




function App() {
  const [userRole, setUserRole] = useState('');
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route path='/CrearCuenta' element={<CrearCuenta/>}/>
        <Route path="/Home" element={<Home userRole={userRole} />} />
        <Route path='/Agregar' element={<AgregarActualizar/>}/>
        <Route path='/Actualizar/:id' element={<AgregarActualizar/>}/>
        <Route/>
      </Routes>
    </Router>
  );
}

export default App;