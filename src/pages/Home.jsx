import React from 'react'
import Landing from '../components/Landing'
import Benefits from '../components/Benefits';
import Header from '../components/Header';
import ButtonGradient from '../assets/svg/ButtonGradient';
import Pricing from '../components/Pricing';

const Home = () => {
    return (
        <>
            <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header />
                <Landing />
                <Benefits />
                {/* <Pricing /> */}
            </div>
            <ButtonGradient />
        </>
    );
}

export default Home
