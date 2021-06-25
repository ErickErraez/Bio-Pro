import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Adjuntos} from '../Models/Adjuntos';
import {environment} from '../../environments/environment';
import {Usuario} from '../Models/Usuario';
import {Timbrada} from '../Models/Timbrada';

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

  uploadFile(image: Adjuntos) {
    return this.http.post(this.url + 'justification', image);
  }

  updateTimbrada(timbrada: Timbrada) {
    return this.http.post(this.url + 'justificationTimbrada', timbrada);
  }

  actualizarUsuarioFoto(usuario: Usuario) {
    return this.http.post(this.url + 'userFoto', usuario);
  }

  addUser(usuario: Usuario) {
    return this.http.post(this.url + 'addUSer', usuario);
  }

  updateUser(usuario: Usuario) {
    return this.http.post(this.url + 'updateUser', usuario);
  }


  getUserAdmin(idRoles) {
    return this.http.get(this.url + `getAdmin/${idRoles}`)
  }

  deleteUser(idRoles) {
    return this.http.get(this.url + `deleteUser/${idRoles}`)
  }

  getUserByEmail(email) {
    return this.http.get(this.url + 'getUserEmail/' + email)
  }


  getUserById(id) {
    return this.http.get(this.url + `getUser/${id}`);
  }


  actualizarPassword(usuario: Usuario) {
    return this.http.post(this.url + 'userPassword', usuario);
  }
}
