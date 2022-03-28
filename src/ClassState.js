import React from "react";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {
               if(SECURITY_CODE !== this.state.value)
                    this.setState({ error: true });   
                else
                    this.setState({ error: false });      
               this.setState({ loading: false });
            }, 3000)
        }
    }

    render(){
        return (
            <div>
                <h2>Eliminar { this.props.name }.</h2>
                <p>Por favor, escriba el código de seguridad.</p>

                { (this.state.error && !this.state.loading) && (
                    <p>Error: el código es incorrecto.</p>
                )}

                { this.state.loading && (
                    <p>Cargando...</p>
                )}

                <input 
                    placeholder="Código de seguridad"
                    value ={ this.state.value }
                    onChange={(event) => {
                        this.setState({ value: event.target.value });
                    }}
                />
                <button 
                    type="button"
                    onClick={ () => this.setState({ loading: true })}
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export { ClassState };