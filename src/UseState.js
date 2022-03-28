import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }){
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    const onConfirm = () =>{
        setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        });
    };

    const onError = () =>{
        setState({
            ...state,
            error: true,
            loading: false,
        });
    };

    const onWrite = (newValue) => {                    
        setState({ 
            ...state,
            value : newValue,
        });
    }

    const onCheck = () =>{
        setState({
            ...state,
            loading: true,
        });
    }

    const onDelete = () =>{
        setState({
            ...state,
            value: '',
            deleted: true,
        });
    }

    const onReset = () =>{
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        });
    }

    React.useEffect(() => {
        if(state.loading){
            setTimeout(() => {
                state.value === SECURITY_CODE ? onConfirm() : onError();
            }, 3000)
        }
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar { name }.</h2>
                <p>Por favor, escriba el código de seguridad.</p>
    
                { (state.error && !state.loading) && (
                    <p>Error: el código es incorrecto.</p>
                )}
                { state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    placeholder="Código de seguridad"
                    value={ state.value }
                    onChange={ (event) =>{
                        onWrite(event.target.value);
                    }}
                />
                <button 
                    type="button"
                    onClick={() => { 
                        onCheck();
                    }}
                >
                    Comprobar
                </button>
            </div>
        )
    }else if(state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <h2>Eliminar {name}</h2>
                <p>Pedimos confirmación. ¿Desea borrar?</p> 
                <button 
                    type="button"
                    onClick={() => {
                        onDelete();
                    }}
                >
                    Si, deseo borrar.
                </button>
                <button 
                    type="button"
                    onClick={() => {
                        onReset();
                    }}
                >
                    No.
                </button>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
                <h2>Ha sido eliminado {name}.</h2>
                <button 
                    type="button"
                    onClick={() => {
                        onReset();
                    }}
                >
                    Resetear.
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };