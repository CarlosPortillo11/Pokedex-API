import React, { Component } from 'react';
import PokeDexLogo from './PokedexBanner.png';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="bg-transparent py-4 top-0 fixed w-full z-10 flex items-center">
                <div className="flex w-full items-cente justify-center">
                    <Link to="/">
                        <img src={PokeDexLogo} className="h-16 w-64"/>
                    </Link>
                </div>
            </nav>
        )
    }
}
