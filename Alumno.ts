import Materia from "./Materia";
import Persona from "./Persona";
const { v4: uuidv4 } = require('uuid');
import Profesor from "./Profesor";
import { chequear, escribir, guardar, leer } from "./Utils";

const pathAlumnos = ('./Alumnos.json')
const fs = require('fs');
const readlineSync = require('readline-sync');

class Alumno implements Persona {
  nombre: string;
  apellido: string;
  dni: number;
  materiasMatriculadas: { materia: { nombre: string, id: string }, nota: number }[];
  id: string;
  
  constructor(nombre: string, apellido: string, dni: number) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.materiasMatriculadas = [];
    this.id = uuidv4().slice(0, 6);
  }

  getPromedio() {
    //Arreglo para guardar promedio 
    const promediosAlumnos: { id: string, promedio: number }[] = [];
    const alumnos = leer(pathAlumnos)
    while(true){
    const id = readlineSync.question('Ingrese el ID del alumno a obtener promedio: ')

    if (id === "salir") {
      break;
    }
    //Buscar al alumno en el arreglo
            const alumno = alumnos.find((a: any) => a.id === id);
        if (!alumno) {
          (`No se encontró un alumno con ID: ${id}`);
        } else{
        let totalNotas = 0;
        const materiasMatriculadas = alumno.materiasMatriculadas;
        for (let i = 0; i < materiasMatriculadas.length; i++) {
          totalNotas += materiasMatriculadas[i].nota;
        }
        const promedio = parseFloat((totalNotas / materiasMatriculadas.length).toFixed(1));
        promediosAlumnos.push({ id, promedio });
        console.log(`El promedio de notas del alumno es: ${promedio}`)
        }
    } 
    
    return promediosAlumnos; 
  }

}
         
  export default Alumno;
