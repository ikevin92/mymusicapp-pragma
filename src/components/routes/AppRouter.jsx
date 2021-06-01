
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

    const tokenStorage = localStorage.getItem( 'token' );

    const { user, isAuthenticated, loginUser, logout } = useContext( SpotifyContext );
    console.log( { user } );

    console.log( { isAuthenticated } );

    console.log( { tokenStorage } );

    let autenticado = true;


    if ( tokenStorage === 'undefined' || !tokenStorage   ) {

        autenticado = false;
        localStorage.removeItem('token')
       
        // console.log( "token", token );
    } else {

        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;
        localStorage.setItem( 'token', _token );

        if ( _token ) {
            // setToken( _token );

            console.log( _token );
            return

        }

        autenticado = true;
    }

    return (
        <Router>
            <div>


                <Switch>

                    <PublicRoute
                        exact
                        path="/login"
                        component={ Login }
                        isAuthenticated={ autenticado }
                    />

                    <PrivateRoute
                        path="/"
                        component={ HomeRoutes }
                        isAuthenticated={ autenticado }
                    />

                </Switch>
            </div>
        </Router >
    );
};

export default AppRouter;
