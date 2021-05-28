import './App.css';
import { useEffect, useState, useContext } from 'react';
import { getTokenFromUrl } from './api/spotify';

import SpotifyWebApi from "spotify-web-api-js";
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SpotifyState from './context/spotify/SpotifyState';
import SpotifyContext from './context/spotify/SpotifyContext';

const spotify = new SpotifyWebApi();

// revisar si tenemos un token
const token_sotrage = localStorage.getItem( 'token' );

function App () {

    const [ token, setToken ] = useState();
    

    useEffect( () => {


        // Lectura del token
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;

        localStorage.setItem( 'token', _token );

        // enviar token al state

        if ( _token ) {
            setToken( _token );
            // spotify.setAccessToken( _token );
        }

        console.log( "token", _token );



    }, [] );


    return (
        <SpotifyState>

            <div>
                {/* <h1>my music app</h1> */ }
                <div className="app">{ token ? <Home /> : <Login /> }</div>
            </div>
        </SpotifyState>
    );
}

export default App;
