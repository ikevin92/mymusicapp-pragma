import './App.css';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './api/spotify';

import SpotifyWebApi from "spotify-web-api-js";
import Login from './components/pages/Login';

const spotify = new SpotifyWebApi();

function App () {

    const [ token, setToken ] = useState();

    useEffect( () => {


        // Lectura del token
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;

        if ( _token ) {
            setToken( _token );
            spotify.setAccessToken( _token );
        }

        console.log( "token", _token );

        spotify.setAccessToken( _token );

        // spotify.getMe().then( ( user ) => {
        //     dispatch( {
        //         type: "SET_USER",
        //         user,
        //     } );
        // } );

        // spotify.getUserPlaylists().then( ( playlists ) => {
        //     dispatch( {
        //         type: "SET_PLAYLISTS",
        //         playlists,
        //     } );
        // } );


        // spotify.getPlaylist( "37i9dQZF1EF34Ucml4HHx1w" ).then( ( playlist ) => {
        //     dispatch( {
        //         type: "SET_DISCOVER_WEEKLY",
        //         discover_weekly: playlist,
        //     } );
        // } );

    }, [] );


    return (
        <div>
            {/* <h1>my music app</h1> */ }
            <div className="app">{ token ? <h1>Logged in</h1> : <Login /> }</div>
        </div>
    );
}

export default App;
