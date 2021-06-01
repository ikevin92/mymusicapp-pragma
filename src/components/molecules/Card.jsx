
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as onLike } from '@fortawesome/free-solid-svg-icons';
import { faHeart as outLike } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';





const Card = ( props ) => {

    console.log( { props } );



    const [ likeStatus, setLikeStatus ] = useState( false );

    const handleLike = ( id ) => {

        setLikeStatus( !likeStatus );

        console.log( id );

        


    };


    const { album, artists, name, id } = props.values;


    return (
        <div className="col">

            <div className="card bg-dark text-light">
                <img src={ album.images[ 0 ].url } className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{ name }</h5>
                    <p className="card-text">{ artists[ 0 ].name }</p>
                    <button onClick={ () => handleLike( id ) } className="btn btn-primary"><FontAwesomeIcon icon={ likeStatus ? onLike : outLike } /> Like</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
