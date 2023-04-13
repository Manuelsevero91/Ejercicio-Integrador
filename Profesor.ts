import Persona from "./Persona";

 class Profesor implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materia: string;
    contrato: boolean;

    constructor(nombre: string, apellido: string, dni: number, materia: string, contrato: boolean){
           this.nombre = nombre; 
           this.apellido = apellido; 
           this.dni = dni; 
           this.materia= materia; 
           this.contrato = contrato; 
        
    }

}
export default Profesor;
