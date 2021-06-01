import logo from '../../assets/img/file-music.svg'
import {
    NavLink,
    Link,
    useHistory
} from "react-router-dom";

const Header = () => {


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ">
                
                <a className="navbar-brand" href="/">

                    <img src={ logo } alt="logo" width="30" height="24" className="d-inline-block align-text-top" />
                    My MusicApp

                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
          
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">                         
                            <Link to="/home" className="btn btn-dark mr-2" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/favorites" className="btn btn-dark mr-2">Favorites</Link>
                            
                        </li>


                    </ul>

                </div>
            </div>
        </nav>




    );
};

export default Header;
