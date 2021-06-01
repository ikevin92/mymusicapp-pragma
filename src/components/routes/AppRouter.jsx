
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Login from '../pages/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SpotifyContext from './../../context/spotify/SpotifyContext';
import { useContext, useEffect, useState } from 'react';
import HomeRoutes from './HomeRoutes';
import { getTokenFromUrl } from '../../api/spotify';


const AppRouter = () => {



    const [ autenticado, setAutenticado ] = useState( false );

    const { user, isAuthenticated, loginUser, logout, loading } = useContext( SpotifyContext );
    console.log( { user } );
    // console.log( { loading } );

    console.log( { isAuthenticated } );

    const tokenStorage = localStorage.getItem( 'token' );


    useEffect( () => {
        console.log( 'rutas' );


        console.log( { tokenStorage } );

        if ( tokenStorage === 'undefined' || !tokenStorage ) {

            setAutenticado( false );
            localStorage.removeItem( 'token' );

            const hash = getTokenFromUrl();
            console.log( { hash } );
            if ( hash ) {
                window.location.hash = "";
                const _token = hash.access_token;
                localStorage.setItem( 'token', _token );

                if ( _token ) {
                    // setToken( _token );

                    console.log( _token );
                    setAutenticado( true );
                    return;

                }
            }

            // console.log( "token", token );
        } else {
            console.log( 'existe el token' );
            setAutenticado( true );

            return;
        }

    }, [] );

    return (
        <Router>
            <div>


                <Switch>

                    <PublicRoute
                        exact
                        path="/"
                        component={ Login }
                        isAuthenticated={ autenticado }
                    />

                    <PrivateRoute
                        path="/home"
                        component={ HomeRoutes }
                        isAuthenticated={ autenticado }
                    />

                </Switch>
            </div>
        </Router >
    );
};

export default AppRouter;
