
export default interface Persona {
  nombre: string;
  apellido: string;
  dni: number;

  crear(): void;
  modificar(): void;
  listar(): void;
  eliminar(): void;
}