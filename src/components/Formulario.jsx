import React ,{Fragment, useState}from 'react';
import {v4 as uuidv4} from 'uuid'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //crear state de citas
    const [cita, actualizarCita]=useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''

    });

    const [error, actualizarError] = useState(false)
    //funcion que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
       actualizarCita({
           ...cita,
           [e.target.name]:e.target.value
       })
    }
    //extraer los valores  aplicamos destructutring
    const {mascota , propietario , fecha, hora, sintomas}=cita
    //cuando el usuario presiona agrgar cita
    const submitCita = e =>{
        e.preventDefault();
        

        //validar el forulario trim= elimina espacios en blanco
        if(mascota.trim() === '' || 
            propietario.trim()==='' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim()===''){
            actualizarError(true);
            return;
        }
        //eliminar mensaje todos los campos son obligatorios
        actualizarError(false);

        //asignar ID
        cita.id  =  uuidv4();
        

        // crear la cita
        crearCita(cita);

        //reiniciar el form
    actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    }
    return ( 
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
                onSubmit={submitCita}
            >
                <label>Nombre de Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del propietario"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas" 
                    onChange={actualizarState}
                    value={sintomas}>
                    
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
     );
}
 
Formulario.propTypes={
    cita:PropTypes.object.isRequired,
    eliminarCita:PropTypes.func.isRequired}


export default Formulario;