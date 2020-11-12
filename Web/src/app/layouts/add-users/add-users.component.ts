import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../services/user.service';
import {Usuario} from '../../Models/Usuario';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  newUSer: Usuario = new Usuario();

  constructor(private alert: AlertService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  mayus(e) {
    e.value = e.value.toUpperCase();
  }


  addUser() {
    this.newUSer.newpassword = '0';
    this.newUSer.password = '$2b$10$wN9wjB53XhvTFtYPSyBD.uOqb4GHFmMFWNKvwEi35ofFcBsmKEiey';
    this.newUSer.foto.idAdjuntos = 1;
    if (this.newUSer.cedula !== '' && this.newUSer.nombre !== '' && this.newUSer.correo !== '') {
      this.userService.addUser(this.newUSer).subscribe((res: any) => {
        this.alert.showNotification('success', 'pe-7s-bell', res.message);
      }, err => {
        if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
          this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
        } else {
          this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
        }
      });
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'Existen campos vacíos');
    }
  }
}
