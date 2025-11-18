import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
        return (
                <div className='bg-gray-300 '>
                        <Navbar></Navbar>
                        <Outlet></Outlet>
                        <Footer></Footer>
                        
                </div>
        );
};

export default MainLayout;