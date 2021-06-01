import { useEffect, useState, useContext } from 'react';
import axios from 'axios';


import Header from './../organisms/Header';
import Detail from './../organisms/Detail';
import ListBox from './../molecules/ListBox';
import Dropdown from './../molecules/Dropdown';

import { Credenciales } from '../../api/Credenciales';
import SpotifyContext from '../../context/spotify/SpotifyContext';

import "./Home.scss";
import { getTokenFromUrl } from '../../api/spotify';



const Home = () => {

    // Importacion de las credenciales
    const spotify = Credenciales();
    // console.log( spotify );

    const { genresList,
        genreSelect,
        playlist,
        playlistSelect,
        loadGenresAPI,
        loadGenreSelect,
        loadPlaylistAPI,
        loadPlaylistSelect,
        loadTracksAPI,
        tracksList
    } = useContext( SpotifyContext );

    // state para el token
    const [ token, setToken ] = useState( '' );
    const [ tracks, setTracks ] = useState( { selectedTrack: '', listOfTracksFromAPI: [] } );
    const [ trackDetail, setTrackDetail ] = useState( null );

    // enviarlo a un dispacht
    const leerToken = async () => {
        // btoa encripta en base-64

        try {
            const response = await axios( 'https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa( spotify.ClientId + ':' + spotify.ClientSecret )
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
            } );

            const { access_token } = response.data;

            console.log( { access_token } );

            // asignacion del token al state
            setToken( access_token );

            await loadGenresAPI( access_token );

        } catch ( error ) {
            console.log( error );
            setToken( '' );

        }
    };


    const handleGenreOnChange = ( value ) => {

        loadGenreSelect( value );
        loadPlaylistAPI( value );

    };

    const handlePlaylistOnChange = ( value ) => {

        loadPlaylistSelect( value );

    };



    // funcion para buscar
    const handleSubmit = ( e ) => {

        e.preventDefault();

        console.log( 'submit', playlistSelect );

        loadTracksAPI( playlistSelect );

        // carga los tracks
        // listboxClicked( playlist.selectedPlaylist );


    };

    // FUNCION LISTBOX
    const listboxClicked = ( value ) => {

        const currentTracks = [ ...tracks.listOfTracksFromAPI ];

        const trackInfo = currentTracks.filter( t => t.track.id === value );

        setTrackDetail( trackInfo[ 0 ].track );
    };


    // LOGIN Y LOGOUT
    const handleLogin = () => {
        leerToken();
    };

    const handleLogout = ( e ) => {
        e.preventDefault();
        setToken( '' );
    };

    useEffect( () => {
        console.log( 'componente cargado' );
        console.log( genresList );


        if ( genresList.length === 0 ) {
            loadGenresAPI();
        }


    }, [ genresList, loadGenresAPI ] );

    return (
        <>


            {/* <Header /> */ }


            <form onSubmit={ handleSubmit }>

                <div className='container mt-4'>

                    <div className="mb-3">
                        <Dropdown
                            // options={ genres.listOfGenresFromAPI }
                            options={ genresList }
                            // selectedValue={ genres.selectedGenre }
                            selectedValue={ genreSelect }
                            changed={ handleGenreOnChange }
                        />
                    </div>

                    <div className=" mb-3">
                        <Dropdown
                            options={ playlist }
                            selectedValue={ playlistSelect }
                            // selectedValue={ playlist.selectedPlaylist }
                            changed={ handlePlaylistOnChange }
                        />

                    </div>

                    <button type='submit' className="btn btn-outline-light">
                        Buscar
                    </button>
                    <button onClick={ handleLogout } >Logout</button>
                </div>
            </form>


            <ListBox
                items={ tracksList }
                clicked={ listboxClicked }
            />

            {
                trackDetail &&
                <Detail { ...trackDetail } />

            }


        </>
    );
};

export default Home;
