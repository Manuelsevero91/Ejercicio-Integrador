import Gestor from "./Gestor";
import Materia from "./Materia";
import Profesor from "./Profesor";
import {chequear, escribir, leer, guardar} from "./Utils";
const { v4: uuidv4 } = require('uuid');

// let Jim = new Profesor('Jim', 'Jarmusch', 2332323, 'director cine', true, uuidv4 )
// // const directorCine = new Materia('director cine', Jim)
// let Danny = new Profesor('Danny', 'Boyle',3151613, 'Fotografia', true, uuidv4 )
// let Francis = new Profesor('Francis', 'Coppola', 51651515, 'Guionista', true, uuidv4 )

// let path = './profesores.json';
// guardar(path, Danny)

let trainspotting = new Gestor('trainspotting');

trainspotting.agregarAlumno();

// trainspotting.modificarAlumno('Vladimir', [], 'Rembrandt')



