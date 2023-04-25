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

export class Alumno implements Persona {
  nombre: string;
  apellido: string;
  dni: number;
  materiasMatriculadas: { materia: { nombre: string, id: string }, nota: number }[];
  id: string;
  // promedioNotas: number;


  constructor(nombre: string, apellido: string, dni: number,
    id: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.materiasMatriculadas = [];
    this.id = uuidv4().slice(0, 6);
    // this.promedioNotas = promedioNotas;

  }

  }





