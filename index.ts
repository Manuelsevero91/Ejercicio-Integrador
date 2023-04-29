import Gestor from "./Gestor";
import Materia from "./Materia";
import Profesor from "./Profesor";
import {chequear, escribir, leer, guardar} from "./Utils";
const { v4: uuidv4 } = require('uuid');
import Alumno from "./Alumno";


let trainspotting = new Gestor('trainspotting');
let pepe = new Alumno('peter', 'Toshing', 21245213)
// trainspotting.agregarAlumno()
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarAlumno();
// trainspotting.agregarMateria()
// // trainspotting.eliminarAlumno()
// // trainspotting.eliminarAlumno()
// // trainspotting.eliminarAlumno()
// trainspotting.rescindirContratoDeProfesor()
// trainspotting.rescindirContratoDeProfesor()
// trainspotting.actualizarContratoProfesor();
// trainspotting.actualizarContratoProfesor();
// trainspotting.agregarMateria()
// trainspotting.agregarMateria()
// trainspotting.agregarMateria()
// pepe.getPromedio()
trainspotting.run();



