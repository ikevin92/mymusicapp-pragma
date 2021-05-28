import { useEffect, useState } from 'react';
import axios from 'axios';



import Header from './../organisms/Header';
import Detail from './../organisms/Detail';
import ListBox from './../molecules/ListBox';
import Dropdown from './../molecules/Dropdown';
import { Credenciales } from '../../api/Credenciales';
import SpotifyContext from '../../context/spotify/SpotifyContext';
import { useContext } from 'react';


const Home = () => {

    // Importacion de las credenciales
    const spotify = Credenciales();
    // console.log( spotify );


    const { genresList,
        genreSelect,
        playlist,
        playlistsSelect,
        loadGenresAPI,
        loadGenreSelect,
        loadPlaylistAPI,
        loadPlaylistSelect
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

    const loadTracksAPI = async () => {

        try {
            const response = await axios( `https://api.spotify.com/v1/playlists/${ playlist.selectedPlaylist }/tracks?limit=10`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            } );

            console.log( response.data.items );

            setTracks( {
                selectedTrack: tracks.selectedTrack,
                listOfTracksFromAPI: response.data.items
            } );

        } catch ( error ) {
            console.log( error );
        }
    };



    // funcion para buscar
    const handleSubmit = ( e ) => {
        e.preventDefault();
        console.log( 'submit', playlist.selectedPlaylist );
        loadTracksAPI();

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


        loadGenresAPI();



    }, [] );

    return (
        <>
            <Header />

            <div className="container">


                <form onSubmit={ handleSubmit }>

                    <div className='container' >
                        <Dropdown
                            // options={ genres.listOfGenresFromAPI }
                            options={ genresList }
                            // selectedValue={ genres.selectedGenre }
                            selectedValue={ genreSelect }
                            changed={ handleGenreOnChange }
                        />
                        <Dropdown
                            options={ playlist }
                            selectedValue={ playlistsSelect }
                            // selectedValue={ playlist.selectedPlaylist }
                            changed={ handlePlaylistOnChange }
                        />

                        <ListBox
                            items={ tracks.listOfTracksFromAPI }
                            clicked={ listboxClicked }
                        />

                        {
                            trackDetail &&
                            <Detail { ...trackDetail } />

                        }



                        <button type='submit'>
                            Buscar
                        </button>
                        <button onClick={ handleLogout } >Logout</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Home;
