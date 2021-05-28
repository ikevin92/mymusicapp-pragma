
import { createContext, useContext, useReducer, useState } from "react";


// se crea el context
export const SpotifyContext = createContext();


// provider donde se encuentran las funciones y el state
export const SpotifyProvider = ( props ) => {

    // state del context
    const [ playlist, setPlaylist ] = useState( [] );
    const [ favoritos, setFavoritos ] = useState( [] );

    // llamado al api
    useEffect( () => {

        const obtenerPlaylist = async () => {

            const url = "";

            const playlist = await
       }
        
        
    }, [] );

    return;
    (

        <SpotifyContext.Provider value={ {} }>
            { props.children }
        </SpotifyContext.Provider>
    );
};

export const useDataLayerValue = () => useContext( DataLayerContext );