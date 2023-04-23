import Profesor from "./Profesor";
import { Alumno, MateriasMatriculadas } from "./Alumno";
import Materia from "./Materia";
const { v4: uuidv4 } = require('uuid');
import { chequear, escribir, leer, guardar } from "./Utils";

let materias = leer('./Materias.json');
let profesores = leer('./Profesores.json');
let alumnos = leer('./Alumnos.json');
const fs = require('fs');
const readlineSync = require('readline-sync');

export default class Gestor {
  nombre: string;
  alumnos: [];
  materias: [];
  profesor: Profesor[];
  constructor(nombre: string) {
    this.nombre = nombre;
    this.alumnos = [];
    this.materias = [];
    this.profesor = [];
    //  Por cada archivo chequear si existe, si existe leer su contenido y almecenarlo en la variable correspondiente,
    //  sino crear el archivo e inicializar la variable correspondiente en vacio
  }
  public obtenerMateria(materiaBuscada: string, materias: Materia[]): Materia | null {
    return materias.find(materia => materia.nombre === materiaBuscada) || null;
    // Devuelve la materia que tenga el nombre especificado, o null si no se encuentra
  }

  agregarAlumno() {
    let pathAlumnos = './Alumnos.json';
    let pathMaterias = './Materias.json';
    let nombre = readlineSync.question('Nombre del alumno: ');
    let apellido = readlineSync.question('Apellido del alumno: ');
    let dni = readlineSync.question('DNI del alumno: ');
    let id = uuidv4().slice(0, 6)
    let materias: string[] = ['Direccion', 'Guion', 'Fotografia', 'Produccion', 'Sonido', 'Montaje']
    let Materias = leer(pathMaterias); // Leer datos de profesores
    let materiasMatriculadas: { materia: Materia, nota: number }[] = [];
  
    while (true) {
      let indiceMateriasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere matricular: ');

      if (indiceMateriasMatriculadas === -1) {
        break;
      }

      let materiaElegida = materias[indiceMateriasMatriculadas];
      let materia = this.obtenerMateria(materiaElegida, Materias); // Obtener la materia seleccionada

      if (materia) {
        let nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
        nota = parseInt(nota);

        while (!(nota >= 0 && nota <= 10)) {
          console.log('Por favor, ingrese un valor numérico válido entre 0 y 10 para la nota.');
          nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
          nota = parseInt(nota);
        }


        materiasMatriculadas.push({ materia: materia, nota: nota });

      } else {
        console.log('No se encontró la materia en la lista de materias. Por favor, intenta de nuevo.');
      }
    }
    let sumaNotas = 0;
    for (let i = 0; i < materiasMatriculadas.length; i++) {
      sumaNotas += materiasMatriculadas[i].nota;
    }

    let promedioNotas = sumaNotas / materiasMatriculadas.length;
    let nuevoAlumno = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      id: id,
      materiasMatriculadas: materiasMatriculadas,
      promedioNotas: promedioNotas
    }

    guardar(pathAlumnos, nuevoAlumno);
    console.log('Alumno agregado con éxito!');
  }

  agregarProfesor() {
    let pathProfesores = './Profesores.json';
    let nombre = readlineSync.question('Nombre del profesor: ');
    let apellido = readlineSync.question('Apellido del profesor: ');
    let dni = readlineSync.question('DNI del profesor: ');
    let contrato = readlineSync.question('Contrato del profesor: ');
    let materias = leer('./materias.json')
    console.log('Materias disponibles:');
    for (let materia of materias) {
      console.log(`ID: ${materia.id}, Nombre: ${materia.nombre}`);
    }
    let materiaId = readlineSync.question('Id de la materia que dicta: ');

    let id = uuidv4().slice(0, 6);
    let nuevoProfesor = new Profesor(nombre, apellido, dni, materiaId, contrato, id);


    guardar(pathProfesores, nuevoProfesor);
  }



  buscarAlumno(nombre: string, pathAlumno: Alumno[]) {
    let AlumnoEncontrado = pathAlumno.find(alumno => alumno.nombre === nombre)
    if (AlumnoEncontrado) {
      console.log(nombre, ' Existe en la lista', AlumnoEncontrado)
      return AlumnoEncontrado
    } else {
      console.log(nombre, ' No existe en la lista');

    }
  }
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
  eliminarAlumno() {

  }

  modificarProfesor() {

  }

  eliminarProfesor() {

  }
}
  // Definir función para obtener profesores de un alumno específico
  function obtenerProfesoresDeAlumno(alumnoId: string) {
    const alumno = alumnos.find(function (alumno: any) {
      return alumno.id === alumnoId;
    });
    if (alumno) {
      const materiasMatriculadas = alumno.materiasMatriculadas.map(function (materia: any) {
        return materia.id;
      }); // Obtener IDs de las materias matriculadas por el alumno
      const profesoresDeAlumno = profesores.filter(function (profesor: any){
        return materiasMatriculadas.includes(profesor.materiaId);
      }); // Filtrar profesores por las materias matriculadas por el alumno
      return profesoresDeAlumno;
    } else {
      console.log('No se encontró el alumno con el ID proporcionado.');
      return [];
    }
  }
  // Obtener ID del alumno específico
  let alumnoId = readlineSync.question('Ingresa el ID del alumno: ');
  
  // Obtener y mostrar profesores del alumno específico
  const profesoresDelAlumno = obtenerProfesoresDeAlumno(alumnoId);
  console.log('Profesores del alumno con ID', alumnoId);
  console.log(profesoresDelAlumno);
  

// / // Definir función para obtener alumnos de un profesor específico
let obtenerAlumnosDeProfesor = (profesorId: string) => {
  // Buscar al profesor por su ID en la lista de profesores
  const profesor = profesores.find((profesor: any) => profesor.id === profesorId);
  if (profesor) {
    const materiaImpartida = profesor.materiaId; // Obtener ID de la materia impartida por el profesor
    const alumnosDelProfesor = alumnos.filter((alumno: any) => alumno.materiasMatriculadas.find((materia: any) => materia.id === materiaImpartida)); // Filtrar alumnos por las materias matriculadas que coincidan con la materia impartida por el profesor
    return alumnosDelProfesor;
  } else {
    console.log('No se encontró el profesor con el ID proporcionado.');
    return [];
  }
};

// Obtener ID del profesor específico
let profesorId = readlineSync.question('Ingresa el ID del profesor: ');

// Obtener y mostrar alumnos del profesor específico
const alumnosDelProfesor = obtenerAlumnosDeProfesor(profesorId);
console.log('Alumnos del profesor con ID', profesorId);
console.log(alumnosDelProfesor);






