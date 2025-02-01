import React from 'react';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import NewAccount from './pages/NewAccount';
import Demo from './pages/Demo';

const App =() => {
  return(
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<NewAccount />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
    </>
  );
};

export default App;
