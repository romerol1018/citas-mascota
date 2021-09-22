import React, {Fragment, useState ,useEffect} from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'
import PropTypes from 'prop-types'


//usando skeleton un framework similar a bootstrap
function App() {
//Guardadndo citas en el local storage
let citasIniciales = JSON.parse (localStorage.getItem('citas'))
if(!citasIniciales){
  citasIniciales=[];
}
//arreglo para las citas
const [citas , guardarCitas]=useState(citasIniciales);
//use efect para realizar ciertas operaciones cuando el state cambia
useEffect(() => {
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(citasIniciales) {
    localStorage.setItem('citas', JSON.stringify(citas))
  } else {
    localStorage.setItem('citas', JSON.stringify([]));
  }
},[citas])

// crear una funcion que tome las citas actuales y cre la nueva
const crearCita= cita =>{
  guardarCitas([
    ...citas,cita
  ]);
}
// funcion que elimina una cita por su id
const eliminarCita = id => {
  const nuevasCitas=citas.filter(cita=> cita.id !==id);
  guardarCitas(nuevasCitas)
}

//mensaje condicional


const titulo= citas.length ===0 ? 'No hay Citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
            crearCita={crearCita}
            />
            
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita=>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>

      </div>
    </Fragment>
  
  );
}
//forma de documentar los componentes
Formulario.propTypes ={
  crearCita: PropTypes.func.isRequired
}

export default App;
