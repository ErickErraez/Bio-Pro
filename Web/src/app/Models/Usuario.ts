import {Rol} from './Rol';
import {Adjuntos} from './Adjuntos';

export class Usuario {
  idUsuarios?: number;
  idBio?: number;
  cedula?: string;
  nombre?: string;
  correo?: string;
  password?: string;
  newpassword?: string;
  tipocontrato?:string;
  rol: Rol = new Rol();
  foto: Adjuntos = new Adjuntos();
}
