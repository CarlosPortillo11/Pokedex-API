import React from 'react';
import './App.css';
import NavBar from './Components/screen/Navbar';
import Entry from './Components/pokemon/PokemonEntrys';
import Pattern from './poke-pattern.jpg';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PokemonPage from './Components/pokemon/Pokemon';

function App() {
  return (
    <Router>
      <div className="App" style={{background: `url(${Pattern})`}}>
        <NavBar/>
        <div className="pt-32">
          <Switch>
            <Route exact path="/" component={Entry}/>
            <Route exact path="/pokemon/:pokemonIndex" component={PokemonPage}/>  
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
