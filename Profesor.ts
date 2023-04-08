import Persona from "./Persona";

 class Profesor implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiasQueDicta: string;
    contrato: boolean;

    constructor(nombre: string, apellido: string, dni: number, materiasQueDicta: string, contrato: boolean){
           this.nombre = nombre; 
           this.apellido = apellido; 
           this.dni = dni; 
           this.materiasQueDicta = materiasQueDicta; 
           this.contrato = contrato; 
        
    }

}
export default Profesor;
