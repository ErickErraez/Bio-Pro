import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adjuntos} from '../Models/Adjuntos';
import {environment} from '../../environments/environment';
import {Usuario} from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.url + 'user/';

  constructor(private http: HttpClient) {

  }

  actualizarFoto(image: Adjuntos) {
    return this.http.post(this.url + 'foto', image);
  }

  actualizarUsuarioFoto(usuario: Usuario) {
    return this.http.post(this.url + 'userFoto', usuario);
  }

  addUser(usuario: Usuario) {
    return this.http.post(this.url + 'addUSer', usuario);
  }

  getUserAdmin(idRoles) {
    return this.http.get(this.url + `getAdmin/${idRoles}`)
  }

}
