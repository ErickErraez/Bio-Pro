import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../services/user.service';
import {Usuario} from '../../Models/Usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  newUSer: Usuario = new Usuario();
  contactForm: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    return new FormGroup({
      idUsuarios: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      idRoles: new FormControl('', Validators.required),
    });
  }

  constructor(private alert: AlertService, private userService: UserService) {
    this.contactForm = this.createFormGroup();
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
    if (this.contactForm.valid) {
      this.userService.addUser(this.newUSer).subscribe((res: any) => {
        this.alert.showNotification('success', 'pe-7s-bell', res.message);
        this.resetForm();
      }, err => {
        if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
          this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
        } else {
          this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
        }
      });
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'NO VÁLIDO');
    }
  }

  resetForm() {
    this.contactForm.reset();
  }

  get idUsuarios() {
    return this.contactForm.get('idUsuarios')
  }
  get nombre() {
    return this.contactForm.get('nombre')
  }
  get cedula() {
    return this.contactForm.get('cedula')
  }
  get correo() {
    return this.contactForm.get('correo')
  }
  get idRoles() {
    return this.contactForm.get('idRoles')
  }

}
