import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Box from './PokemonBox';

export default class Entry extends Component {

    state = {
        pokes: [],
        url: 'https://pokeapi.co/api/v2/pokemon/',
    }

    async componentDidMount() {
        await Axios.get('https://pokeapi.co/api/v2/pokemon/?limit=811')
            .then(response => {
                this.setState({
                    pokes: response.data.results,
                })
            })
    }

    render() {
        return (
            <div className="w-full justify-center flex flex-wrap">
                {this.state.pokes.map(pokemon => (
                    <Box name={pokemon.name} key={pokemon.name} url={pokemon.url}/>
                ))};
            </div>
        )
    }
}
