import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../services/user.service';
import any = jasmine.any;

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  newUSer = {
    idUsuarios: 0,
    cedula: '',
    nombre: '',
    correo: '',
    newpassword: '',
    foto: 'asdas',
    rol: 1

  }

  constructor(private alert: AlertService, private userService: UserService) {
  }

  ngOnInit(): void {
  }

  addUser() {

    if (this.newUSer.cedula !== '' && this.newUSer.nombre !== '' && this.newUSer.correo !== ''
      && this.newUSer.newpassword !== '') {
      console.log(this.newUSer);
    //  this.userService.addUser(this.newUSer).subscribe((res: any) => {
     // })
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'Existen campos vacíos');
    }
  }
}
