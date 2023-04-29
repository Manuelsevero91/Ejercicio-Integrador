import Profesor from "./Profesor";
import Alumno from "./Alumno";
import Materia from "./Materia";
const { v4: uuidv4 } = require('uuid');
import { chequear, escribir, leer, guardar } from "./Utils";

const pathMaterias = ('./Materias.json')
const pathProfesores = ('./Profesores.json')
const pathAlumnos = ('./Alumnos.json')
const fs = require('fs');
const readlineSync = require('readline-sync');
const Gustavo = new Alumno('Gustavo', 'Cordera', 5443265);

export default class EscuelaCine {
  nombre: string;
  alumnos: [];
  materias: [];
  profesor: [];
  constructor(nombre: string) {
    this.nombre = nombre;
    this.alumnos = [];
    this.materias = [];
    this.profesor = [];

  }

  agregarAlumno() {
    // Cargar la lista de materias desde el archivo JSON
    let materias: Materia[] = leer(pathMaterias);
    let nombre = readlineSync.question('Nombre del alumno: ');
    let apellido = readlineSync.question('Apellido del alumno: ');
    let dni = readlineSync.question('DNI del alumno: ');
    let id = uuidv4().slice(0, 6)
    let materiasMatriculadas: { materia: Materia, nota: number }[] = [];

    // Seleccionar las materias 
    while (true) {
      // Muestra la lista de materias 
      materias.forEach(materia => console.log(materia.nombre));

      let indiceMateriasMatriculadas = readlineSync.keyInSelect(materias.map(materia => materia.nombre), 'Materias que se quiere matricular: ');

      if (indiceMateriasMatriculadas === -1) {
        break;
      }
      // Obtener la materia seleccionada
      let materiaElegida = materias[indiceMateriasMatriculadas];
      let materia = materiaElegida;

      // Verificar si la materia ya se encuentra en la lista de materias matriculadas
      let materiaSeleccionada = materiasMatriculadas.find(mat => mat.materia.nombre === materia.nombre);

      if (materiaSeleccionada) {
        console.log(`Ya seleccionaste la materia ${materia.nombre}. Selecciona otra materia.`);
      } else {

        let nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
        nota = parseInt(nota);

        while (!(nota >= 0 && nota <= 10)) {
          console.log('Ingrese un valor numérico válido entre 0 y 10 para la nota.');
          nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
          nota = parseInt(nota);
        }

        materiasMatriculadas.push({ materia: materia, nota: nota });
      }
    }
    let nuevoAlumno = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      materiasMatriculadas: materiasMatriculadas,
      id: id,
    }
    guardar(pathAlumnos, nuevoAlumno);
    console.log('Alumno agregado con éxito!');
  }


  eliminarAlumno(): void {
    const id = readlineSync.question('Ingrese el ID del alumno a eliminar: ')
    let alumnos = leer('./Alumnos.json');
    // Busca el indice del alumno en el arreglo
    const indice = alumnos.findIndex((alumno: Alumno) => alumno.id === id);
    if (indice !== -1) {
      alumnos.splice(indice, 1); // Eliminar el alumno del array
      escribir(alumnos, './Alumnos.json');
      console.log(`El alumno con ID ${id} ha sido eliminado`);
    } else {
      console.log(`No se ha encontrado un alumno con ID ${id}`);
    }
  }

  agregarProfesor() {
    const pathProfesores = './Profesores.json';
    let nombre = readlineSync.question('Nombre del profesor: ');
    let apellido = readlineSync.question('Apellido del profesor: ');
    let dni = readlineSync.question('DNI del profesor: ');
    let contrato = true;
    let materias = leer('./materias.json')
    console.log('Materias disponibles:');
    for (let materia of materias) {
      console.log(`ID: ${materia.id}, Nombre: ${materia.nombre}`);
    }
    let materiaId = readlineSync.question('Id de la materia que dicta: ');

    let id = uuidv4().slice(0, 6);
    let nuevoProfesor = new Profesor(nombre, apellido, dni, materiaId, contrato, id);


    guardar(pathProfesores, nuevoProfesor);
    console.log('Profesor agregado con éxito!');
  }

  actualizarContratoProfesor(): void {
    const id = readlineSync.question('Ingrese el ID del profesor del contrato a actualizar: ')
    const profesores = leer('./Profesores.json');
    let ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
    if (ProfesorEncontrado) {
      ProfesorEncontrado.contrato = true;
      escribir(profesores, './Profesores.json',);
      console.log(`El contrato de profesor con ID ${id} ha sido actualizado`);
    } else {
      console.log(`No se ha encontrado al profesor con ID ${id}`);
    }
  }

  rescindirContratoDeProfesor(): void {
    const id = readlineSync.question('Ingrese el ID del profesor del contrato ha rescindir: ')
    const profesores = leer('./Profesores.json');
    let ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
    if (ProfesorEncontrado) {
      ProfesorEncontrado.contrato = false;
      escribir(profesores, './Profesores.json',);
      console.log(`El contrato de profesor con ID ${id} ha sido rescindido`);
    } else {
      console.log(`No se ha encontrado al profesor con ID ${id}`);
    }
  }

  agregarMateria() {
    let pathMateria = './Materias.json'
    let nombre = readlineSync.question('Nombre de la materia: ');
    let id = uuidv4().slice(0, 6);
    let nuevaMateria = new Materia(nombre, id);
    guardar(pathMateria, nuevaMateria);
  }

  // Función para obtener profesores por ID de alumno
  getProfesoresPorAlumno() {
    const profesores = leer(pathProfesores);
    const alumnos = leer(pathAlumnos);
    const alumnoId = readlineSync.question('Ingresa el ID del alumno: ');

    // Buscar al alumno por su ID
    const alumno = alumnos.find((alumno: any) => alumno.id === alumnoId);

    if (alumno) {
      const materiaIds = alumno.materiasMatriculadas.map((materiaMatriculada: any) => materiaMatriculada.materia.id);

      //Filtra arreglo de profesores y obtiene solo aquellos que tienen un id de materia que se encunetre en el arreglo de los ids de alumno//
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

  // Definir la función
  getAlumnosPorProfesor() {
    const profesores = leer(pathProfesores);
    const alumnos = leer(pathAlumnos);
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
        console.log(JSON.stringify(alumnosDelProfesor, null, 2));
      } else {
        console.log('No se encontraron alumnos para el profesor con ID:', profesorId);
      }
    } else {
      console.log('No se encontró el profesor con ID:', profesorId);
    }

  } buscarProfesor(): Profesor {
    const id = readlineSync.question('Ingrese el ID del profesor: ');
    const profesores = leer('./Profesores.json');
    const ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
    if (ProfesorEncontrado) {
      console.log(id, 'Existe en la lista', ProfesorEncontrado);
      return ProfesorEncontrado;
    } else () => {
      console.log(id, 'No existe en la lista')
    }
    return ProfesorEncontrado;
  }

  buscarAlumno(): Alumno {
    const id = readlineSync.question('Ingrese el ID del alumno: ');
    const alumnos = leer('./Alumnos.json');
    const AlumnoEncontrado = alumnos.find((alumno: Alumno) => alumno.id === id);
    if (AlumnoEncontrado) {
      console.log(id, 'Existe en la lista', JSON.stringify(AlumnoEncontrado, null, 2));
      return AlumnoEncontrado;
    } else {
      console.log(id, 'No existe en la lista');
      return AlumnoEncontrado;
    }
  }

  listarAlumnos(): void {
    const alumnos: Alumno[] = leer(pathAlumnos);
    for (let i = 0; i < alumnos.length; i++) {
      const alumno = alumnos[i];
      console.log(alumno.nombre, alumno.apellido)
    }
  }

  alumnosPorPromedio(promediosAlumnos: { id: string, promedio: number }[], alumnos: Alumno[]): void {
    // Ordenar el arreglo de promedios de forma descendente
    promediosAlumnos.sort((a, b) => b.promedio - a.promedio);

    // Mostrar listado de alumnos y sus promedios
    console.log("Listado de alumnos por promedio:");
    for (let i = 0; i < promediosAlumnos.length; i++) {
      const id = promediosAlumnos[i].id;
      const promedio = promediosAlumnos[i].promedio;

      // Buscar el nombre y apellido del alumno por ID
      const alumno = alumnos.find(alumno => alumno.id === id);
      const nombre = alumno?.nombre;
      const apellido = alumno?.apellido;

      // Mostrar nombre, apellido y promedio
      console.log(`ID: ${id}, ${nombre} ${apellido}, Promedio: ${promedio}`);
    }
  }

  listarProfesores(): void {
    const profesores: Profesor[] = leer(pathProfesores);
    for (let i = 0; i < profesores.length; i++) {
      const profesor = profesores[i];
      console.log(profesor.nombre, profesor.apellido);
    }
  }

  Menu(): void {
    console.log('==== MENU ====');
    console.log('1. Lista de Alumnos ');
    console.log('2. Lista de Profesores ');
    console.log('3. Buscar Alumno por id ');
    console.log('4. Buscar Profesor por id ');
    console.log('5. Obtener profesores de un Alumno ');
    console.log('6. Obtener alumnos de un Profesor ');
    console.log('7. Listar alumnos por promedio ');
    console.log('8. Agregar un alumno ');
    console.log('9. Agregar un profesor ');
    console.log('10. Salir ');
  }

  salir(): void {
  }
  ejecutarOpcion(opcion: string): void {
    switch (opcion) {
      case '1':
        this.listarAlumnos();
        break;
      case '2':
        this.listarProfesores();
        break;
      case '3':
        this.buscarAlumno();
        break;
      case '4':
        this.buscarProfesor();
        break;
      case '5':
        this.getProfesoresPorAlumno();
        break;
      case '6':
        this.getAlumnosPorProfesor();
        break;
      case '7':
        const alumnos = leer(pathAlumnos)
        const promediosAlumnos = Gustavo.getPromedio();
        this.alumnosPorPromedio(promediosAlumnos, alumnos);
        break;
      case '8':
        this.agregarAlumno();
        break;
      case '9':
        this.agregarProfesor();
        break;
      case '10':
        this.salir();
        console.log('Adios y Gracias');
        break;
      default:
        console.log('Opción inválida, intenta de nuevo');
    }
  }
  run(): void {
    let opcionSeleccionada: string = '';
    while (opcionSeleccionada !== '10') {
      this.Menu();
      opcionSeleccionada = readlineSync.question('Escribe el numero de la opcion que deseas: ');
      this.ejecutarOpcion(opcionSeleccionada);

    }
  }

}
