import { useReducer } from 'react';
import axios from 'axios';
import SpotifyContext from './SpotifyContext';
import SpotifyReducer from './SpotifyReducer';
import { SET_GENRE, SET_GENRES, GET_TOKEN, SET_PLAYLIST_SELECT, SET_PLAYLISTS, SET_TRACK_SELECT, SET_TRACKS, LOGOUT } from '../../types';
import { SET_USER } from './../../types/index';

const SpotifyState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem( 'token' ) || null, // obtenemos del localstorage,
        genresList: [],
        genreSelect: null,
        playlist: [],
        playlistSelect: null,
        tracksList: [],
        trackSelect: null,
        item: null,
        isAuthenticated: false
    };
    // hook para reducers
    const [ state, dispatch ] = useReducer( SpotifyReducer, initialState );


    // funciones 
    // metodo para leer las genres
    const loadGenresAPI = async () => {
        const token = localStorage.getItem( 'token' );
        try {
            const responses = await axios( 'https://api.spotify.com/v1/browse/categories?locale=es_CO', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            } );

            console.log( responses.data.categories.items );

            const { items } = responses.data.categories;

            dispatch( {
                type: SET_GENRES,
                payload: items
            } );

        } catch ( error ) {
            console.log( 'error', error );

        }

    };

    const loadGenreSelect = ( value ) => {
        dispatch( {
            type: SET_GENRE,
            payload: value
        } );
    };


    // playlist
    const loadPlaylistAPI = async ( value ) => {

        const token = localStorage.getItem( 'token' );

        try {
            const response = await axios( `https://api.spotify.com/v1/browse/categories/${ value }/playlists?limit=10`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            } );

            const { items } = response.data.playlists;

            dispatch( {
                type: SET_PLAYLISTS,
                payload: items
            } );


        } catch ( error ) {

            console.log( { error } );

        }
    };

    const loadPlaylistSelect = ( value ) => {
        dispatch( {
            type: SET_PLAYLIST_SELECT,
            payload: value
        } );
    };

    //tracks
    const loadTracksAPI = async ( playlist ) => {

        const token = localStorage.getItem( 'token' );

        try {
            const response = await axios( `https://api.spotify.com/v1/playlists/${ playlist }/tracks?limit=10`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            } );

            console.log( response.data.items );

            const { items } = response.data;

            dispatch( {
                type: SET_TRACKS,
                payload: items
            } );

            // setTracks( {
            //     selectedTrack: tracks.selectedTrack,
            //     listOfTracksFromAPI: response.data.items
            // } );

        } catch ( error ) {
            console.log( error );
        }
    };


    const loginUser = async () => {

        console.log( "login user" );

        const token = localStorage.getItem( 'token' );

        try {
            const response = await axios( `https://api.spotify.com/v1/me`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            } );

            console.log( "login", response.data );

            const { data } = response;

            dispatch( {
                type: SET_USER,
                payload: data
            } );

            // setTracks( {
            //     selectedTrack: tracks.selectedTrack,
            //     listOfTracksFromAPI: response.data.items
            // } );

        } catch ( error ) {

            console.log( error );

            logout();

        }
    };

    const logout = () => {
        dispatch( {
            type: LOGOUT
        } );
    };


    return (
        <SpotifyContext.Provider
            value={ {
                token: state.token,
                user: state.user,
                genresList: state.genresList,
                genreSelect: state.genreSelect,
                playlist: state.playlist,
                playlistSelect: state.playlistSelect,
                tracksList: state.tracksList,
                trackSelect: state.trackSelect,
                item: state.item,
                isAuthenticated: state.isAuthenticated,
                // funciones
                loadGenresAPI,
                loginUser,
                loadGenreSelect,
                loadPlaylistAPI,
                loadPlaylistSelect,
                loadTracksAPI,
                logout
            } }
        >
            { props.children }

        </SpotifyContext.Provider>
    );
};
//https://medium.com/cleverprogrammer/spotify-clone-using-reactjs-the-ultimate-guide-2a47977a1e4f
export default SpotifyState;
