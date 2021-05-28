import { useReducer } from 'react';
import axios from 'axios';
import SpotifyContext from './SpotifyContext';
import SpotifyReducer from './SpotifyReducer';
import { SET_GENRE, SET_GENRES, GET_TOKEN, SET_PLAYLIST_SELECT, SET_PLAYLISTS } from '../../types';

const SpotifyState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem( 'token' ) || null, // obtenemos del localstorage,
        genresList: [],
        genreSelect: null,
        playlist: [],
        playlistSelect: null,
        tracks: [],
        trackSelect: null,
        item: null,
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
    const loadTracksAPI = async (playlist) => {

        try {
            const response = await axios( `https://api.spotify.com/v1/playlists/${ playlist }/tracks?limit=10`, {
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


    const loadToken = () => {
        dispatch( {
            type: GET_TOKEN
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
                tracks: state.tracks,
                trackSelect: state.trackSelect,
                item: state.item,
                // funciones
                loadGenresAPI,
                loadToken,
                loadGenreSelect,
                loadPlaylistAPI,
                loadPlaylistSelect,
                loadTracksAPI
            } }
        >
            { props.children }

        </SpotifyContext.Provider>
    );
};
//https://medium.com/cleverprogrammer/spotify-clone-using-reactjs-the-ultimate-guide-2a47977a1e4f
export default SpotifyState;
