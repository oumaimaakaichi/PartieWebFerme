import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./login";
import Dash from './dashboard';
import Fermes from './fermes';
import Accounts from './account';
import FarmStatistics from './statis'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginReg />} />
        <Route path="/home" element={<Dash />} />
        <Route path="/ferme" element={<Fermes />} />
        <Route path="/accounts/:id" element={<Accounts />} />
        <Route path="/statistique" element={<FarmStatistics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
