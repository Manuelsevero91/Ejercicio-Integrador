import Persona from "./interface";

abstract class Profesor implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiasQueDicta: string;
    contrato: boolean;
    alumnosPorMateria: number;

    constructor(nombre: string, apellido: string, dni: number, materiasQueDicta: string, contrato: boolean, 
        alumnosPorMateria: number){
           this.nombre = nombre; 
           this.apellido = apellido; 
           this.dni = dni; 
           this.materiasQueDicta = materiasQueDicta; 
           this.contrato = contrato; 
           this.alumnosPorMateria = alumnosPorMateria; 
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
export default Profesor;
