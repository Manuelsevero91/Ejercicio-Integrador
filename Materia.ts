import Profesor from "./Profesor"

export default class Materia {
  nombre: string;
  profesor: Profesor;

  constructor(nombre: string, profesor: Profesor) {
    this.nombre = nombre;
    this.profesor = profesor;
  }
    
}

