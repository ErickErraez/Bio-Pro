import {Rol} from './Rol';
import {Adjuntos} from './Adjuntos';

export class Usuario {
  idUsuarios?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  rol: Rol;
  foto: Adjuntos;
}
