import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';  // Import your CSS file
import ListPatients from './components/ListPatients';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/list-patients" element={<ListPatients />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
