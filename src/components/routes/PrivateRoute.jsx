
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ( {
    isAuthenticated,
    component: Component,
    ...rest //traemos el resto de los elementos
}) => {
    return (
        <Route { ...rest }
            component={ ( props ) => (
                ( isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/" /> )
            ) }

        />
    )
}

export default PrivateRoute
