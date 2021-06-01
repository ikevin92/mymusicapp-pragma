import './App.css';
import { useEffect, useState, useContext } from 'react';
import { getTokenFromUrl } from './api/spotify';

import SpotifyWebApi from "spotify-web-api-js";
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import SpotifyState from './context/spotify/SpotifyState';
import SpotifyContext from './context/spotify/SpotifyContext';
import AppRouter from './components/routes/AppRouter';

const spotify = new SpotifyWebApi();

// revisar si tenemos un token
const token_sotrage = localStorage.getItem( 'token' );

function App () {
    


    return (
        <SpotifyState>



            {/* { token
                    ? <AppRouter />
                    : <Login />
                } */}


            {/* <AppRouter token={ token } /> */ }
            <AppRouter />


        </SpotifyState>
    );
}

export default App;
