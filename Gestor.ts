import Profesor from "./Profesor";
import Alumno from "./Alumno";
import Materia from "./Materia";

export default class Gestor{
    nombre: string;
    alumnos: Alumno[];
    materias: Materia[];
    profesor: Profesor [];
    constructor(nombre: string, alumnos:Alumno [], materias: Materia [], profesor: Profesor[]) {
        this.nombre = nombre;
        this.alumnos = [];
        this.materias = [];
        this.profesor = [];
    }
    sumarAlumnos(alumno:Alumno, array: Alumno[] ) {
        if (array.push(alumno)){
            console.log("Se añadió a: ", alumno);
        }
        return Alumno
    }
    modificarAlumnos(alumno:Alumno, nuevoDato:any){
    }
}

