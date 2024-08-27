import React from 'react';
import Navbar from '../PublicPages/Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../PublicPages/Components/Footer';

const PublicOutlet = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default PublicOutlet;