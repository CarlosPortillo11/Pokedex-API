import React, { Component } from 'react'
import Axios from 'axios';
import './Style.css';
import PokeInfo from './pokeinfo-back.png'

const type_colors = {
    dark: '4F3A2D',
    ground: 'D3B357',
    fairy: 'F4B1F4',
    fighting: '823551D',
    ghosts: '6060B2',
    fire: 'E73B0C',
    steel: 'B5B5C3',
    flying: 'A3B3F7',
    bug: 'B1C12E',
    normal: 'C8C4BC',
    water: '3295F6',
    electric: 'FCBC17',
    ice: 'A3E7FD',
    psychic: 'ED4882',
    rock: 'B9A156',
    dragon: '755EDF',
    grass: '74C236',
    poison: '934594',
}

export default class PokemonInfo extends Component {

    state = {
        name: '',
        height: '',
        weight: '',
        imageUrl: '',
        description: '',
        types: [],
        abilites: '',
        stats: {
            hp: "",
            attack: "",
            defense: "",
            specialattack: "",
            specialdefense: "",
            speed: "",
        }
    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;
        const pokespecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        const pokeurl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonresp = await Axios.get(pokeurl)

        const name = pokemonresp.data.name;
        const height = pokemonresp.data.height;
        const weight = pokemonresp.data.weight;
        const imageUrl = pokemonresp.data.sprites.front_default;

        const types = pokemonresp.data.types.map(type => type.type.name);

        var { hp, attack, defense, specialattack, specialdefense, speed } = '';

        pokemonresp.data.stats.map(resp => {
            switch (resp.stat.name) {
                case 'hp':
                    hp = resp['base_stat'];
                    break;
                case 'attack':
                    attack = resp['base_stat'];
                    break;
                case 'defense':
                    defense = resp['base_stat'];
                    break;
                case 'special-attack':
                    specialattack = resp['base_stat'];
                    break;
                case 'special-defense':
                    specialdefense = resp['base_stat'];
                    break;
                case 'speed':
                    speed = resp['base_stat'];
                    break;
            }
        })

        await Axios.get(pokespecies)
            .then(response => {
                var description = '';
                response.data.flavor_text_entries.some(flavor => {
                    if (flavor.language.name === 'es') {
                        description = flavor.flavor_text;
                        return;
                    }
                })
                this.setState({
                    description: description,
                })
            })

        this.setState({
            name: name,
            height: height,
            weight: weight,
            imageUrl: imageUrl,
            types: types,
            stats: {
                hp,
                attack,
                defense,
                specialattack,
                specialdefense,
                speed
            }
        });
        console.log(this.state)
    }

    render() {
        return (
            <div className="PokemonInfo mx-32 rounded h-auto flex flex-col">
                <div class="w-full py-3 bg-blue-400 px-4">
                    <p className="text-white font-semibold font-sans text-3xl text-center poke-font">
                        {this.state.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                    </p>
                </div>
                <div className="w-full h-auto p-5 flex" style={{background: `url(${PokeInfo})`,backgroundPosition: "center",backgroundSize: "cover"}}>
                    <div class="flex flex-col w-1/4">
                        <div className="w-full h-auto flex items-center rounded-full bg-blue-400 justify-center">
                            <img src={this.state.imageUrl} className="w-64 h-64" />
                        </div>
                        <div className="flex justify-center w-full mt-5">
                            {this.state.types.map(types => (
                                <span key={types} className="w-auto h-auto rounded py-1 px-3 ml-2 poke-font" style={{ backgroundColor: `#${type_colors[types]}`, color: 'white' }}>
                                    {types.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1))}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mx-10 w-3/4 flex flex-col items-start">
                        <div className="mt-6">
                            <p className="text-base italic text-black font-semibold poke-font text-center">
                                {this.state.description}
                            </p>
                        </div>
                        <div className="mt-8 flex justify-around w-full">
                            <div>
                                <p className="text-base text-black font-semibold italic poke-font">
                                    Peso: {this.state.weight} hg
                                </p>
                            </div>
                            <div>
                                <p className="text-base italic text-black font-semibold tracking-tight poke-font">
                                    Altura: {this.state.height} dm
                                </p>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <div className="flex w-full justify-center">
                                <div className="flex items-center">
                                    <p className="text-base font-semibold poke-font">
                                        HP
                                    </p>
                                    <div className="bg-blue-400 rounded py-2 px-4 text-white poke-font flex items-center justify-center w-16 h-10 ml-3">
                                        {this.state.stats.hp}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 ml-20 flex w-full">
                                <div className="flex items-center w-1/2">
                                    <p className="text-base font-semibold poke-font w-1/3">
                                        Attack
                                    </p>
                                    <div className="bg-blue-400 rounded text-white poke-font ml-3 flex items-center justify-center w-16 h-10">
                                        {this.state.stats.attack}
                                    </div>
                                </div>
                                <div className="flex items-center w-1/2">
                                    <p className="text-base font-semibold poke-font w-1/3">
                                        Defense
                                    </p>
                                    <div className="bg-blue-400 rounded text-white poke-font ml-3 flex items-center justify-center w-16 h-10">
                                        {this.state.stats.defense}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 ml-20 flex w-full">
                                <div className="flex items-center w-1/2">
                                    <p className="text-base font-semibold poke-font w-1/3">
                                        Special Attack
                                    </p>
                                    <div className="bg-blue-400 rounded text-white poke-font ml-3 flex items-center justify-center w-16 h-10">
                                        {this.state.stats.specialattack}
                                    </div>
                                </div>
                                <div className="flex items-center w-1/2">
                                    <p className="text-base font-semibold poke-font w-1/3">
                                        Special Defense
                                    </p>
                                    <div className="bg-blue-400 rounded text-white poke-font ml-3 flex items-center justify-center w-16 h-10">
                                        {this.state.stats.specialdefense}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
