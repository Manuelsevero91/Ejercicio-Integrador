import Profesor from "./Profesor";
import {Alumno, MateriasMatriculadas} from "./Alumno";
import Materia from "./Materia";
import path from "path";
const { v4: uuidv4 } = require('uuid');
import {chequear, escribir, leer, guardar} from "./Utils";

const fs = require ('fs');
const readlineSync = require('readline-sync');

export default class Gestor{
    nombre: string;
    alumnos: [];
    materias: [];
    profesor: Profesor [];
    constructor(nombre: string) {
        this.nombre = nombre;
        this.alumnos = [];
        this.materias = [];
        this.profesor = [];
//  Por cada archivo chequear si existe, si existe leer su contenido y almecenarlo en la variable correspondiente,
//  sino crear el archivo e inicializar la variable correspondiente en vacio
    }

    // data(){
    //     // return JSON.parse(fs.readFileSync('./Alumnos.json'))
    // }
   
    agregarAlumno(){
        let pathAlumno = './Alumnos.json';
        let nombre = readlineSync.question('Nombre del alumno: ');
        let apellido = readlineSync.question('Apellido del alumno: ');
        let dni = readlineSync.question('DNI del alumno: ');

        let materias = ['Direccion', 'Guionista', 'Fotografia', 'Produccion', 'Sonido', 'Montaje']
        let materiasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere matricular: ');
        for (let i = 1; i <= materiasMatriculadas; i++);

        let id = uuidv4 ().slice(0,6);

        let nuevoAlumno = new Alumno(nombre, apellido, dni,materiasMatriculadas, id)
        
        // let alumnos = [...this.data(), nuevoAlumno];    
        guardar(pathAlumno, nuevoAlumno);
}
//      buscarAlumno(nombre: string, pathAlumno: Alumno[]){
//        let AlumnoEncontrado = pathAlumno.find(alumno => alumno.nombre === nombre )
//     if(AlumnoEncontrado){
//         console.log(nombre, ' Existe en la lista', AlumnoEncontrado)
//         return AlumnoEncontrado
//     } else{
//         console.log(nombre, ' No existe en la lista');
        
//     }
// }
    // modificarAlumno(id: string, path: string){
    //    let alumnoModificar = ().find
    //    if(alumnoModificar){
    //     alumnoModificar.nombre = id;
    //     console.log('El alumno', nombre, ' Ha sido modificado y ahora se llama ', id);
    // }
    // else {
    //     console.log('El alumno no se ha podido modificar');
        
    // }
    // }
    // eliminarAlumno(){

    // }
 agregarProfesor(){
    let pathProfesores = './Profesores.json';
    let nombre = readlineSync.question('Nombre del profesor: ');
    let apellido = readlineSync.question('Apellido del profesor: ');
    let dni = readlineSync.question('DNI del profesor: ');
    let contrato = readlineSync.question('Contrato del profesor: ');
    let materia = readlineSync.question('Materia que dicta: ');
    let id = uuidv4 ().slice(0,6);
    let nuevoProfesor = new Profesor(nombre, apellido, dni, materia, contrato, id);

    guardar(pathProfesores, nuevoProfesor);
 }


    
    }