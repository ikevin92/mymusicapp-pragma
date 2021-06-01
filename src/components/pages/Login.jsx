import { useHistory, Link } from 'react-router-dom';
import { loginUrl } from '../../api/spotify';
import "./Login.scss";


const Login = () => {
    const history = useHistory();

    console.log( 'login bro' );

    const handleOnClick = () => {
        console.log( loginUrl );
      
        
        window.location.href = loginUrl

    };


    return (
        <div className="login">
            <img
                src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
                alt="Spotify logo"
            />

            <button onClick={ handleOnClick }  >LOGIN WITH SPOTIFY</button>


        </div>
    );
};

export default Login;
