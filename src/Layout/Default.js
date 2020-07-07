import React from 'react';
import Navbar from "../Components/Navbar"

const Default = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
}

export default Default; 