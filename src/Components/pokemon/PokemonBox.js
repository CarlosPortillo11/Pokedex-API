import React, { Component } from 'react';
import axios from 'axios';
import Entry from './PokemonEntrys';
import Axios from 'axios';
import Loading from './Loading.gif';
import { Link } from 'react-router-dom';
import PokedexBack from './pokeback.jpg'

export default class Box extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequests: false
    };



    componentDidMount() {
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[6];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex
        });
    }

    render() {

        return (
            <div className="rounded w-1/5 mx-3 my-4 flex flex-col bg-white hover:shadow-2xl hover:bg-purple-500" style={{transition: "0.2s"}}>
                <Link to={`pokemon/${this.state.pokemonIndex}`} >
                    <div className="w-full bg-blue-400 h-12 flex px-3">
                        <p className="text-base text-white my-auto poke-font">
                            {this.state.pokemonIndex}
                        </p>
                    </div>
                    <div className="px-3 pt-4" style={{background: `url(${PokedexBack})`}}>
                        <div className="w-full flex justify-center">
                            <p className="text-xl tracking-tighter font-semibold text-black text-center poke-font">
                            {this.state.name .toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)) .join(' ')}
                            </p>
                        </div>
                        <div className="mt-3 flex flex-col w-full justify-center">
                            {this.state.imageLoading ? (
                                <div className="flex w-full justify-center">
                                    <img src={Loading} className="h-24 w-24" />
                                </div>
                            ) : null}
                            <div className="flex justify-center w-full">
                                <img className="h-32 w-32"
                                    src={this.state.imageUrl}
                                    onLoad={() => this.setState({ imageLoading: false })}
                                    onError={() => this.setState({ toManyRequests: true })}
                                    style={
                                        this.state.toManyRequests ? { display: 'none' }
                                            : this.state.imageLoading ? null : { display: 'block' }
                                    }
                                />
                            </div>
                            {this.state.toManyRequests ? (
                                <div className="flex justify-center w-auto my-3 bg-purple-600 rounded py-1">
                                    <p className="text-base font-semibold italic text-white font-sans text-center py-auto">
                                        Demasiadas Peticiones
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

}