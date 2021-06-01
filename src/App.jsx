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


 


    // useEffect( () => {

    //     console.log( 'componente principal' );
    //     const hash = getTokenFromUrl();
    //     console.log( { hash } );
    //     window.location.hash = "";
    //     const _token = hash.access_token;

    //     if ( _token ) {
    //         setToken( _token );
    //     }

    //     console.log( "token", token );

    // }, [] );


    return (

        <>
            {/* { token
                    ? <AppRouter />
                    : <Login />
                } */}


            {/* <AppRouter token={ token } /> */ }
            <AppRouter />
        </>

    );
}

export default App;
