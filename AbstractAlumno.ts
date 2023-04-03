import Persona from "./interface";

abstract class Alumno implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiasCursadas: string;
    matricula: boolean;
    notaPorMateria: number;

    constructor(nombre: string, apellido: string, dni: number, materiasCursadas: string, matricula: boolean, 
        notaPorMateria: number){
           this.nombre = nombre;
           this.apellido = apellido;
           this.dni = dni;
           this.materiasCursadas = materiasCursadas;
           this.matricula = matricula;
           this.notaPorMateria = notaPorMateria;
    }

    crear(): void{

    }
    modificar(): void{

    }
    listar(): void{

    }
    eliminar(): void{

    }
}
export default Alumno;