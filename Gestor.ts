import Profesor from "./Profesor";
import Alumno from "./Alumno";
import Materia from "./Materia";

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
 
        fs.writeFileSync('./alumnos.json', '[]')
    }

    data(){
        return JSON.parse(fs.readFileSync('./alumnos.json'))
    }
   
    agregarAlumno(){
        let nombre = readlineSync.question('Nombre del alumno: ');
        let apellido = readlineSync.question('Apellido del alumno: ');
        let dni = readlineSync.question('DNI del alumno: ');
        let matricula = readlineSync.question('Matricula del alumno: ');
        let notaPorMateria = readlineSync.question('Nota por materia: ');
        let promedio = readlineSync.question('Promedio: ');

        let nuevoAlumno = new Alumno(nombre, apellido, dni, matricula, notaPorMateria, promedio)
        
        let alumnos = [...this.data(), nuevoAlumno];     
        fs.writeFileSync('./alumnos.json', JSON.stringify(alumnos, null, 3))
   
}
    
}