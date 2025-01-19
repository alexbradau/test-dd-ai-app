import React from 'react';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import NewAccount from './pages/NewAccount';

const App =() => {
  return(
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<NewAccount />} />
        </Routes>
    </>
  );
};

export default App;
