const { v4: uuidv4 } = require('uuid');

export default interface Persona {
  nombre: string;
  apellido: string;
  dni: number;
  readonly id: string;
  
}

