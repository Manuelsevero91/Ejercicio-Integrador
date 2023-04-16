import Materia from "./Materia";
import Persona from "./Persona";
const { v4: uuidv4 } = require('uuid');
import Profesor from "./Profesor";


export enum MateriasMatriculadas{
   Direccion,    
   Guionista,
   Fotografia,
   Produccion,
   Sonido,
   Montaje
}

 export class Alumno implements Persona{
    nombre: string;
    apellido: string;
    dni: number;
    materiasMatriculadas: MateriasMatriculadas;
    id: string;
  
    
    constructor(nombre: string, apellido: string, dni: number, materiasMatriculadas: MateriasMatriculadas,
         id: number){
           this.nombre = nombre;
           this.apellido = apellido;
           this.dni = dni;
           this.materiasMatriculadas = materiasMatriculadas;
           this.id = uuidv4 ().slice(0,6);
          

        }

        agregarMateria(nombre: string){
         }

        actualizarMateria(){

        }
        eliminarMateria(){

        }
        getPromedio(){
             
        }
        
}


