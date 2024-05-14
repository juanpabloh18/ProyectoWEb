import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Paginas/Login';
import CrearCuenta from './Paginas/CrearCuenta';
import Home from './Paginas/Home';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/CrearCuenta' element={<CrearCuenta/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;