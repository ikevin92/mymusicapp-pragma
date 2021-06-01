
import Home from './../pages/Home';
import Favorites from './../pages/Favorites';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './../organisms/Header';
import { useEffect } from 'react';

const HomeRoutes = () => {


    return (
        <>
            <div className="bg-dark bg-gradient vh-100 w-auto">
            < Header />
  

                <Switch>

                    <Route exact path="/home" component={ Home } />
                    <Route exact path="/favorites" component={ Favorites } />
                    <Redirect to="/home" />

                </Switch>
            </div>
        </>
    );
};

export default HomeRoutes;
