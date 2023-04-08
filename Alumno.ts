import Persona from "./Persona";

class Alumno implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiasCursadas: [];
    matricula: boolean;
    notaPorMateria: number;
    promedio: number;

    constructor(nombre: string, apellido: string, dni: number, materiasCursadas: [], matricula: boolean, 
        notaPorMateria: number, promedio: number){
           this.nombre = nombre;
           this.apellido = apellido;
           this.dni = dni;
           this.materiasCursadas = materiasCursadas;
           this.matricula = matricula;
           this.notaPorMateria = notaPorMateria;
           this.promedio = promedio;
    }

}
export default Alumno;