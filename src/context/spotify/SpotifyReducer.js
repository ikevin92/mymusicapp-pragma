
import { SET_USER, SET_PLAYLISTS, SET_PLAYLIST_SELECT, SET_TRACKS, SET_GENRES, SET_GENRE } from './../../types/index';



// eslint-disable-next-line import/no-anonymous-default-export
export default ( state, action ) => {
    console.log( { action } );

    switch ( action.type ) {
        case SET_USER:
            return {
                ...state,
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
                tracks: action.tracks,
            };
        default:
            return state;
    }
};
