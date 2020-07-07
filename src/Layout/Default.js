import React from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import './Default.css';

const Default = (props) => {
    return (
        <div className="default">
            <Navbar />
            {props.children}
            <Footer />
        </div>
    );
}

export default Default; 