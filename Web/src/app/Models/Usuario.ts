import {Rol} from './Rol';
import {Adjuntos} from './Adjuntos';

export class Usuario {
  idUsuarios?: number;
  cedula?: string;
  nombre?: string;
  correo?: string;
  newpassword?: string;
  rol: Rol;
  foto: Adjuntos;
}
