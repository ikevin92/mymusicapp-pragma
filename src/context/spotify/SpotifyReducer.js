
import { SET_USER, SET_PLAYLISTS, SET_PLAYLIST_SELECT, SET_TRACKS, SET_GENRES, SET_GENRE, SET_TRACK_SELECT, LOGOUT } from './../../types/index';



// eslint-disable-next-line import/no-anonymous-default-export
export default ( state, action ) => {
    console.log( { action } );

    switch ( action.type ) {
        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };

        case SET_GENRES:
            return {
                ...state,
                genresList: action.payload,
            };
        case SET_GENRE:
            return {
                ...state,
                genreSelect: action.payload,
            };
        case SET_PLAYLISTS:

            return {
                ...state,
                playlist: action.payload,
            };
        case SET_PLAYLIST_SELECT:
            return {
                ...state,
                playlistSelect: action.payload,
            };

        case SET_TRACKS:
            return {
                ...state,
                tracksList: action.payload,
            };
        case SET_TRACK_SELECT:
            return {
                ...state,
                trackSelect: action.payload,
            };
        case LOGOUT:
            console.log('logout reducer')
            return {

            };
        default:
            return state;
    }
};
