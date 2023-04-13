import { log } from "console";
import Gestor from "./Gestor";
import Materia from "./Materia";
import Profesor from "./Profesor";

const Jim = new Profesor('Jim', 'JArmusch', 2332323, 'director cine', true)
const directorCine = new Materia('director cine', Jim)

console.log(directorCine);

const cinefilia = new Gestor('cinefilia');

cinefilia.agregarAlumno();
cinefilia.agregarAlumno();
cinefilia.agregarAlumno();

console.log(cinefilia.data);



