import Gestor from "./Gestor";
import Materia from "./Materia";
import Profesor from "./Profesor";
import {chequear, escribir, leer, guardar} from "./Utils";
const { v4: uuidv4 } = require('uuid');
import Alumno from "./Alumno";


let trainspotting = new Gestor('trainspotting');
let Manuel = new Alumno('Manuel', 'Severo', 5443265);
// trainspotting.agregarAlumno()
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarProfesor();
// trainspotting.agregarAlumno();
trainspotting.run();
// trainspotting.actualizarContratoProfesor();
// trainspotting.actualizarContratoProfesor();
// Manuel.agregarMateria()
// Manuel.agregarMateria()
// Manuel.agregarMateria()
// Manuel.agregarMateria()
// Manuel.agregarMateria()
// Manuel.getPromedio()




