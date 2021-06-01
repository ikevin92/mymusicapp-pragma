

const Dropdown = ( props ) => {

    console.log(props);

    const { options } = props;

    // const [ selectedValue, setSelectedValue ] = useState( '' );

    

    const handleOnChange = ( e ) => {
        console.log( e.target.value );
        props.changed( e.target.value );
    };


    return (
        <div>
            <select value={ props.selectedValue } onChange={ handleOnChange } className="form-select">
                { options.map( ( item, id ) =>
                    <option key={ item.id } value={ item.id }>{ item.name }</option>
                ) }
            </select>
            {/* <p>{ selectedValue }</p> */}

        </div>
    );
};

export default Dropdown;
