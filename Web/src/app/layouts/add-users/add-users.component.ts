import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../services/user.service';
import any = jasmine.any;
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

  addUser() {
    this.newUSer.newpassword = '0';
    this.newUSer.password = '$2b$10$wN9wjB53XhvTFtYPSyBD.uOqb4GHFmMFWNKvwEi35ofFcBsmKEiey';
    this.newUSer.foto.idAdjuntos = 1;
    if (this.newUSer.cedula !== '' && this.newUSer.nombre !== '' && this.newUSer.correo !== '') {
      console.log(this.newUSer);
      this.userService.addUser(this.newUSer).subscribe((res: any) => {
      });
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'Existen campos vacíos');
    }
  }
}
