
import Card from './Card';

const ListBox = ( props ) => {

    // console.log( { props } );

    const handleOnClick = ( e ) => {

        e.preventDefault();
        console.log( 'Listbox' );
        props.clicked( e.target.id );
    };

    return (
        <div className="container row row-cols-2 row-cols-md-4 g-4 mt-4">
     
            {
                props.items.map( ( item, idx ) =>
                    <Card
                        key={ idx }
                        id={ item.track.id }
                        values = {item.track}
                        onClick={ handleOnClick }
                    >
                        { item.track.name }

                    </Card>
                )
            }
       
        </div>
    );
};

export default ListBox;
