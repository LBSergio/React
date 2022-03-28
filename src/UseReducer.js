import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }){
    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    };

    const actionTypes = {
        CONFIRMED: 'CONFIRMED',
        DELETED: 'DELETED',
        RESET: 'RESET',
        CHECK: 'CHECK',
        WRITE: 'WRITE',
    }

    const reducerObject = (state, payload) => ({
        [actionTypes.CONFIRMED]:{
            ...state,
            loading: false,
            error: false,
            confirmed: true,
        },
        [actionTypes.ERROR]:{
            ...state,
            loading: false,
            error: true,
        },
        [actionTypes.WRITE]:{
            ...state,
            value: payload,
        },
        [actionTypes.CHECK]:{
            ...state,
            loading: true,
        },
        [actionTypes.DELETED]:{
            ...state,
            value: '',
            deleted: true,
        },
        [actionTypes.RESET]:{
            ...state,
            value: '',
            confirmed: false,
            deleted: false,            
        }
    });

    const reducer = (state, action) => { return (reducerObject(state, action.payload)[action.type] || state) };
    
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    const onWrite = ({ target: { value }}) => dispatch({ type: actionTypes.WRITE, payload: value, });
    const onConfirm = () => dispatch({ type: actionTypes.CONFIRMED, });
    const onError = () => dispatch({ type: actionTypes.ERROR, });
    const onCheck = () => dispatch({ type: actionTypes.CHECK });
    const onDelete = () => dispatch({ type: actionTypes.DELETED });
    const onReset = () => dispatch({ type: actionTypes.RESET }); 

    React.useEffect(() => {
        if(state.loading){
            setTimeout(() => {
                state.value === SECURITY_CODE ?  onConfirm() : onError();
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
                    onChange={onWrite}
                />
                <button 
                    type="button"
                    onClick={onCheck}
                >
                    Comprobar.
                </button>
            </div>
        )
    }else if(state.confirmed && !state.deleted){
        return(
            <React.Fragment>
                <h2>Eliminar {name}.</h2>
                <p>Pedimos confirmación. ¿Desea borrar?</p> 
                <button 
                    type="button"
                    onClick={onDelete}
                >
                    Si, deseo borrar.
                </button>
                <button 
                    type="button"
                    onClick={onReset}
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
                    onClick={onReset}
                >
                    Resetear.
                </button>
            </React.Fragment>
        );
    }
}

export { UseReducer };