

const ListBox = ( props ) => {

    console.log( props );

    const handleOnClick = ( e ) => {
        
        e.preventDefault();
        console.log( 'Listbox' );
        props.clicked( e.target.id );
    };

    return (
        <div>

            {
                props.items.map( ( item, idx ) =>
                    <button
                        key={ idx }
                        id={ item.track.id }
                        onClick={ handleOnClick }
                    >
                        { item.track.name }

                    </button>
                )
            }

        </div>
    );
};

export default ListBox;
