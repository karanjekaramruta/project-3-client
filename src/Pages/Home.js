import React, { Component } from 'react';
import Signup from '../Components/auth/SignUp';

class Home extends Component {
    render() {
        return (
            <div className="container is-fullheight mt-6 is-mobile">               
                <div className="column"></div>
                <div className="column"></div>
                <div className="column"></div>
                <div className="columns is-multiline">
                    <div className="column is-half has-text-left">
                        <h1 className="title pb-5">
                            Rent your Books
                        </h1>
                        <p className="subtitle pb-5">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem qui dignissimos consequatur aliquid perferendis nemo. Dolor, aperiam repudiandae vero labore beatae expedita, atque tenetur quae sit voluptatum pariatur harum quasi.
                        </p>
                    </div>
                    <div className="column is-4 is-offset-2 box">
                        <Signup />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;