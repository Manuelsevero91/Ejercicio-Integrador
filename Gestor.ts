import Profesor from "./Profesor";
import { Alumno, MateriasMatriculadas} from "./Alumno";
import Materia from "./Materia";
const { v4: uuidv4 } = require('uuid');
import { chequear, escribir, leer, guardar } from "./Utils";

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
   
//     agregarAlumno() {
//         let pathAlumno = './Alumnos.json';
//         let pathProfesores = './Profesores.json';
//         let nombre = readlineSync.question('Nombre del alumno: ');
//         let apellido = readlineSync.question('Apellido del alumno: ');
//         let dni = readlineSync.question('DNI del alumno: ');
//         let id = uuidv4().slice(0, 6)
//         let materias: string[] = ['Direccion', 'Guionista', 'Fotografia', 'Produccion', 'Sonido', 'Montaje']
//     //    let materias = materiasDeLaCarrera
//         // let materiasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere matricular: ');
//         let materiasMatriculadas: string[] = [];
//         // let materiasMatriculadas: Materia[] = [];
//         while(true){
//             let indiceMateriasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere matricular: ');

//             if(indiceMateriasMatriculadas === -1){
             
//             break;
//         }
//         materiasMatriculadas.push(materias[indiceMateriasMatriculadas]);
       
//     }
//         let nuevoAlumno = {
//             nombre : nombre,
//             apellido: apellido,
//             dni: dni,
//             materiasMatriculadas: materiasMatriculadas,
//             id: id
//         }
//         guardar(pathAlumno, nuevoAlumno); 
// }

// public obtenerProfesor(materia: string, profesores: any[]): any {
//     return profesores.find(profesor => profesor.materia === materia) || null;
//     // Devuelve el profesor que cumpla con la materia especificada, o null si no se encuentra
//   }
public obtenerMateria(materiaBuscada: string, materias: Materia[]): Materia | null {
    return materias.find(materia => materia.nombre === materiaBuscada) || null;
    // Devuelve la materia que tenga el nombre especificado, o null si no se encuentra
  }

  // Función para agregar un nuevo alumno
  agregarAlumno() {
    let pathAlumnos = './Alumnos.json';
    let pathMaterias = './Materias.json';
    let nombre = readlineSync.question('Nombre del alumno: ');
    let apellido = readlineSync.question('Apellido del alumno: ');
    let dni = readlineSync.question('DNI del alumno: ');
    let id = uuidv4().slice(0, 6)
    let materias: string[] = ['Direccion', 'Guion', 'Fotografia', 'Produccion', 'Sonido', 'Montaje']
  
    let Materias = leer(pathMaterias); // Leer datos de profesores
    let materiasMatriculadas: Materia[] = [];
     

    while(true){
      let indiceMateriasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere matricular: ');
  
      if(indiceMateriasMatriculadas === -1){
        break;
      }

      
      let materiaElegida = materias[indiceMateriasMatriculadas];
    //   let profesor = this.obtenerProfesor(materia, profesores); // Obtener el profesor de la materia seleccionada
    let materia = this.obtenerMateria(materiaElegida, Materias); // Obtener la materia seleccionada
    if (materia) {
      materiasMatriculadas.push(materia);
    } else {
      console.log('No se encontró la materia en la lista de materias. Por favor, intenta de nuevo.');
    }
    // materiasMatriculadas.push(materiaMatriculada);
    }

    let nuevoAlumno = {
      nombre : nombre,
      apellido: apellido,
      dni: dni,
      materiasMatriculadas: materiasMatriculadas,
      id: id
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
        let materia = readlineSync.question('Materia que dicta: ');
        let id = uuidv4().slice(0, 6);
        let nuevoProfesor = new Profesor(nombre, apellido, dni, materia, contrato, id);

    
        guardar(pathProfesores, nuevoProfesor);
    }
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

    // modificarProfesor(){

    // }

    // eliminarProfesor(){

    // }
// let Jim = new Profesor('Jim', 'Jarmusch', 2332323, 'Direccion', true, uuidv4 )
// let Danny = new Profesor('Danny', 'Boyle',3151613, 'Fotografia', true, uuidv4 )
// let Francis = new Profesor('Francis', 'Coppola', 51651515, 'Guionista', true, uuidv4 )
// let Quentin = new Profesor('Quentin', 'Tarantino', 51651515, 'Produccion', true, uuidv4 )
// let Akira = new Profesor('Akira', 'Kurosawa', 51651515, 'Guionista', true, uuidv4 )
// let Alejandro = new Profesor('Alejandro', 'Iñarritu', 51651515, 'Guionista', true, uuidv4 )

// const Direccion = new Materia('Direccion', Jim)
// const Guionista = new Materia('Guionista', Francis)
// const Fotografia = new Materia('Direccion', Danny)
// const Produccion = new Materia('Direccion', Quentin)
// const Sonido = new Materia('Direccion', Akira)
// const Montaje = new Materia('Direccion', Jim)
// const materiasDeLaCarrera = ['Direccion', 'Guionista', 'Fotografia', 'Produccion', 'Sonido', 'Montaje']

    // for (let i = 0; i < alumnos.length; i++) {
    //     const alumno = alumnos[i];
    //     console.log(`Alumno: ${alumno.nombre} ${alumno.apellido}`);
    //     for (let j = 0; j < alumno.materiasMatriculadas.length; j++) {
    //       const materia = alumno.materiasMatriculadas[j];
    //       console.log(`Materia: ${materia.nombre}`);
    //       console.log(`Profesor: ${materia.profesor.nombre} ${materia.profesor.apellido}`);}}
    
    // const nombre = readline.question('Ingrese el nombre del alumno: ');
    // const apellido = readline.question('Ingrese el apellido del alumno: ');
    // // Buscamos en el array de alumnos el objeto que coincida con esos valores
    // const alumnoEncontrado = alumnos.find((alumno:Alumno) => alumno.nombre === nombre && alumno.apellido === apellido);
    // if (!alumnoEncontrado) {
    //   console.log(`No se encontró un alumno con nombre ${nombre} y apellido ${apellido}`);
    // } else {
    //   console.log(`Profesores de ${nombre} ${apellido}:`);
    //   // Imprimimos la información de los profesores del alumno encontrado
    //   for (const materia of alumnoEncontrado.materiasMatriculadas) {
    //     console.log(`Materia: ${materia.nombre}`);
    //     console.log(`Profesor: ${materia.profesor.nombre} ${materia.profesor.apellido}`);
    //   }
    // }
 

