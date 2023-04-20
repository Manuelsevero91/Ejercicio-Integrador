import Materia from "./Materia";
import Persona from "./Persona";
const { v4: uuidv4 } = require('uuid');
import Profesor from "./Profesor";
import { chequear, escribir, guardar, leer } from "./Utils";

const fs = require('fs');
const readlineSync = require('readline-sync');

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
  
    
    constructor(nombre: string, apellido: string, dni: number,materiasMatriculadas: MateriasMatriculadas,
         id: string){
           this.nombre = nombre;
           this.apellido = apellido;
           this.dni = dni;
           this.materiasMatriculadas = materiasMatriculadas;
           this.id = uuidv4 ().slice(0,6);
          

        }

        agregarMateria(){
         let pathMateria = './Materias.json'
         let nombre = readlineSync.question('Nombre de la materia: ');
         let profesor = readlineSync.question('Nombre del profesor: ');
         let nuevaMateria = new Materia(nombre, profesor);
         guardar(pathMateria, nuevaMateria);
         
         }
        actualizarMateria(nombre: string){
         let pathMateria = './Materias.json'
         let materias = JSON.parse(fs.readFileSync(pathMateria, 'utf-8'));
         let materiaModificar = materias.findIndex(materia => materia.nombre === nombre);
           
           if (materiaModificar !== -1) {
            materias[materiaModificar].nombre = nombre; 
            fs.writeFileSync(pathMateria, JSON.stringify(materias, null, 2)); 
          }
         
        
          return materias;
        }
      
        eliminarMateria(){

        }
        getPromedio(){
             
        }
        
}


