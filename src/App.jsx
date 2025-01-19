import React from 'react';
import ButtonGradient from "./assets/svg/ButtonGradient";
import Header from './components/Header';
import Landing from './components/Landing'; 
import Benefits from './components/Benefits';

const App =() => {
  return(
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header/>
        <Landing/>
        <Benefits/>
      </div>
      <ButtonGradient />
    </>
  );
};

export default App;
