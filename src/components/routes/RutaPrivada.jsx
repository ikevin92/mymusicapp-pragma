
import { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SpotifyContext from './../../context/spotify/SpotifyContext';


// le pasamos los componentes y props
const RutaPrivada = ( { component: Component, ...props } ) => {

    const authContext = useContext( SpotifyContext );
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect( () => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [] );

    return (
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            // se redirecciona sino  esta autenticado
            <Redirect to="/" />
        ) : (
            // si el usuario esta autenticado lo enviamos al componente
            <Component { ...props } />
        ) } />

    );
};

export default RutaPrivada;