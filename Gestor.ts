import Profesor from "./Profesor";
import { Alumno} from "./Alumno";
import Materia from "./Materia";
const { v4: uuidv4 } = require('uuid');
import { chequear, escribir, leer, guardar } from "./Utils";

let pathProfesores = ('./Profesores.json')
let pathAlumnos = ('./Alumnos.json')
// let materias = leer('./Materias.json');
// let profesores = leer('./Profesores.json');
// let alumnos = leer('./Alumnos.json');
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
      materiasMatriculadas: materiasMatriculadas,
      id: id,
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
 
// Función para obtener profesores por ID de alumno
  getProfesoresPorAlumno() {
    let profesores = leer(pathProfesores);
    let alumnos = leer(pathAlumnos);  
  const alumnoId = readlineSync.question('Ingresa el ID del alumno: ');

  // Buscar al alumno por su ID
  const alumno = alumnos.find((alumno: any) => alumno.id === alumnoId);

  if (alumno) {
    const materiaId = alumno.materiaId;
    // const profesoresDelAlumno = profesores.filter((profesor: any) => profesor.materiaId === materiaId);
    const materiaIds = alumno.materiasMatriculadas.map((materiaMatriculada: any) => materiaMatriculada.materia.id);
    const profesoresDelAlumno = profesores.filter((profesor: any) => materiaIds.includes(profesor.materiaId));
    
    console.log('Profesores del alumno:');
    if (profesoresDelAlumno.length > 0) {
      console.log(profesoresDelAlumno);
    } else {
      console.log('No se encontraron profesores para el alumno con ID:', alumnoId);
    }
  } else {
    console.log('No se encontró el alumno con ID:', alumnoId);
  }
}


// Definir la función getAlumnosPorProfesor sin parámetros
getAlumnosPorProfesor() {
  let profesores = leer(pathProfesores);
  let alumnos = leer(pathAlumnos);
  // Solicitar el ID del profesor al usuario
  const profesorId = readlineSync.question('Por favor, ingrese el ID del profesor: ');

  // Buscar al profesor por su ID
  const profesor = profesores.find((profesor: any) => profesor.id === String(profesorId));

  if (profesor) {
    const materiaId = profesor.materiaId;
    const alumnosDelProfesor = alumnos.filter((alumno: any) => {
      // Buscar si el alumno tiene la materia en la cual el profesor dicta clases
      return alumno.materiasMatriculadas.some((materiaMatriculada: any) => materiaMatriculada.materia.id === materiaId);
    });

    console.log('Alumnos del profesor:');
    if (alumnosDelProfesor.length > 0) {
      console.log(alumnosDelProfesor);
    } else {
      console.log('No se encontraron alumnos para el profesor con ID:', profesorId);
    }
  } else {
    console.log('No se encontró el profesor con ID:', profesorId);
  }
}buscarProfesorPorId(): Profesor {
  const id = readlineSync.question('Ingrese el ID del profesor: ');
  const profesores = leer('./Profesores.json');
  const ProfesorEncontrado = profesores.find((profesor:Profesor )=> profesor.id === id);
  if (ProfesorEncontrado) {
      console.log(id, 'Existe en la lista', ProfesorEncontrado);
      return ProfesorEncontrado;
  } else() => {
      console.log(id, 'No existe en la lista')
        }
        return ProfesorEncontrado;
}

buscarAlumnoPorId(): Alumno {
    const id = readlineSync.question('Ingrese el ID del alumno: ');
    const alumnos = leer('./Alumnos.json');
    const AlumnoEncontrado = alumnos.find((alumno:Alumno )=> alumno.id === id);
    if (AlumnoEncontrado) {
        console.log(id, 'Existe en la lista', AlumnoEncontrado);
        return AlumnoEncontrado;
    } else {
              console.log(id, 'No existe en la lista');
        return AlumnoEncontrado;
    }
  
}


listarAlumnos(): void {
  const pathAlumnos = './Alumnos.json';
  const alumnos: Alumno[] = leer(pathAlumnos);
}
listarProfesores(): void {
const pathProfesores = './Profesores.json';
const profesores:Profesor[] = leer(pathProfesores);
}

mostrarMenu(): void {
  console.log('==== MENU ====');
  console.log('1. Lista de Alumnos ');
  console.log('2. Lista de Profesores ');
  console.log('3. Buscar Alumno por id ');
  console.log('4. Buscar Profesor por id ');
  console.log('5. Obtener profesores de un Alumno ');
  console.log('6. Obtener alumnos de un Profesor ');
  console.log('7. Salir ');
}

salir(): void {
  console.log('Adiós!');
}
ejecutarOpcion(opcion: string): void {
  switch (opcion) {
    case '1':
const A = new Gestor("A");
A.listarAlumnos();
break;
    case '2':
const B = new Gestor("B");
B.listarProfesores();
break;
    case '3':
const C = new Gestor("C");
C.buscarAlumnoPorId();
break;
    case '4':
const D = new Gestor("D");
D.buscarProfesorPorId();
break;
    case '5':
const E = new Gestor("E");
E.getProfesoresPorAlumno();
break;
    case '6':
const F = new Gestor("F");
F.getAlumnosPorProfesor();
break;
    case '7':
  this.salir();
  console.log('Adios y Gracias');
      break;
    default:
      console.log('Opción inválida, intenta de nuevo');
 }
}
run(): void {
  let opcionSeleccionada: string = '';
  while (opcionSeleccionada !== '7') {
    this.mostrarMenu();
    opcionSeleccionada = readlineSync.question('Escribe el numero de la opcion que deseas: ');
    this.ejecutarOpcion(opcionSeleccionada);
    this.run
  }
  }
}











