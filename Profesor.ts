import Persona from "./Persona";
const { v4: uuidv4 } = require('uuid');


 class Profesor implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiaId: string;
    contrato: boolean;
    id: string;

    constructor(nombre: string, apellido: string, dni: number, materiaId: string, contrato: boolean, id: string){
           this.nombre = nombre; 
           this.apellido = apellido; 
           this.dni = dni; 
           this.materiaId= materiaId;
           this.contrato = contrato; 
           this.id = uuidv4 ().slice(0,6);
        
    }

}
export default Profesor;
