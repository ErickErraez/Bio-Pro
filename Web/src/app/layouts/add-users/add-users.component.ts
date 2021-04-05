import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {Rol} from '../../Models/Rol';
import {UserService} from '../../services/user.service';
import {Usuario} from '../../Models/Usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import * as $ from 'jquery';


@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  public tableData1;
  user: Usuario = new Usuario();
  pageActual = 1;
  paginador = 'true';
  deletedId = '';
  paginas = 10;
  filtro = '';
  marked = false;
  theCheckbox = false;
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
      tipocontrato: new FormControl('', Validators.required),
      check: new FormControl('', []),
    });
  }

  constructor(private alert: AlertService, private userService: UserService, private auth: AuthService) {
    this.contactForm = this.createFormGroup();
    this.user = auth.validarToken();
    this.tableData1 = {
      headerRow: ['ID', 'Nombre', 'Correo', 'Rol', ''],
    };
  }

  //pe-7s-trash   pe-7s-pen

  saludar(value) {
    $('#tablausuarios tbody tr').each(function () {
      if ($(this).attr('id') == 'mostrar' + value) {
        $('#evento' + value).css("display", "block");
      }
    })
  }

  ocultar(value) {
    $('#evento' + value).css("display", "none")
  }

  loadUser(id) {
    this.userService.getUserById(id).subscribe((res: any) => {
      this.newUSer.idUsuarios = res.user.idUsuarios;
      this.newUSer.idBio = res.user.idBio;
      this.newUSer.cedula = res.user.cedula;
      this.newUSer.nombre = res.user.nombre;
      this.newUSer.correo = res.user.correo;
      this.newUSer.rol.idRoles = res.user.rol.idRoles;
      this.newUSer.tipocontrato = res.user.tipocontrato;

    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.auth.getUser().subscribe((res: any) => {
      this.tableData1.dataRows = res.users;
    });
  }


  updateUser(usuario: Usuario) {
    const roles: any = new Rol();
    roles.idRoles = usuario.rol;
    usuario.rol = roles;
    this.auth.actualizarUsuarioFoto(usuario).subscribe((res: any) => {
      usuario.rol = res.response.rol;
      this.alert.showNotification('success', 'pe-7s-bell', res.message);
    });

  }

  mayus() {
    this.newUSer.nombre = this.newUSer.nombre.toUpperCase();
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }


  addUser() {
    this.tableData1.dataRows = [];
    this.newUSer.nombre.toUpperCase();
    this.newUSer.newpassword = '0';
    this.newUSer.password = '$2b$10$wN9wjB53XhvTFtYPSyBD.uOqb4GHFmMFWNKvwEi35ofFcBsmKEiey';
    this.newUSer.foto.idAdjuntos = 1;
    if (this.contactForm.valid) {
      // @ts-ignore
      if (this.marked === true) {
        this.userService.addUser(this.newUSer).subscribe((res: any) => {
          this.alert.showNotification('success', 'pe-7s-bell', res.message);
          this.resetForm();
          this.loadUsers();
        }, err => {
          if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
            this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
          } else {
            this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
          }
        });
      } else {
        if (this.cedulaEcuatoriana(this.newUSer.cedula)) {
          this.userService.addUser(this.newUSer).subscribe((res: any) => {
            this.alert.showNotification('success', 'pe-7s-bell', res.message);
            this.resetForm();
            this.loadUsers();
          }, err => {
            if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
              this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
            } else {
              this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
            }
          });
        } else {
          this.alert.showNotification('warning', 'pe-7s-bell', 'CEDULA INCORRECTA');
        }
      }
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'EXISTEN CAMPOS VACÍOS');
    }
  }

  actualizar() {

    this.tableData1.dataRows = [];
    if (this.contactForm.valid) {
      this.newUSer.nombre.toLocaleUpperCase();
      // @ts-ignore
      if (this.marked === true) {
        this.userService.updateUser(this.newUSer).subscribe((res: any) => {
          this.alert.showNotification('success', 'pe-7s-bell', res.message);
          this.resetForm();
          this.loadUsers();
        }, err => {
          if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
            this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
          } else {
            this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
          }
        });
      } else {
        if (this.cedulaEcuatoriana(this.newUSer.cedula)) {
          this.userService.updateUser(this.newUSer).subscribe((res: any) => {
            this.alert.showNotification('success', 'pe-7s-bell', res.message);
            this.resetForm();
            this.loadUsers();
          }, err => {
            if (err.error.mensaje === 'Error: CustomError: EmptyResponse') {
              this.alert.showNotification('danger', 'pe-7s-bell', 'Error en el servidor');
            } else {
              this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
            }
          });
        } else {
          this.alert.showNotification('warning', 'pe-7s-bell', 'CEDULA INCORRECTA');
        }
      }
    } else {
      this.alert.showNotification('warning', 'pe-7s-bell', 'EXISTEN CAMPOS VACÍOS');
    }
  }

  deleteUser() {
    this.tableData1.dataRows = [];

    this.userService.deleteUser(this.deletedId).subscribe((res: any) => {
      this.alert.showNotification('success', 'pe-7s-bell', res.message);
    }, err => {
      this.alert.showNotification('danger', 'pe-7s-bell', err.error.message);
    });

    this.loadUsers();
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

  get tipocontrato() {
    return this.contactForm.get('tipocontrato')
  }

  get check() {
    return this.contactForm.get('check');
  }

  limpiar() {
    this.newUSer = new Usuario();
  }

  cedulaEcuatoriana(cedula: string) {
    // Preguntamos si la cedula consta de 10 digitos
    if (cedula.length === 10) {

      // Obtenemos el digito de la region que sonlos dos primeros digitos
      const digitoRegion = cedula.substring(0, 2);

      // Pregunto si la region existe ecuador se divide en 24 regiones
      if (digitoRegion >= String(1) && digitoRegion <= String(24)) {
        // Extraigo el ultimo digito
        const ultimoDigito = Number(cedula.substring(9, 10));
        // Agrupo todos los pares y los sumo
        const pares = Number(cedula.substring(1, 2)) + Number(cedula.substring(3, 4)) + Number(cedula.substring(5, 6)) + Number(cedula.substring(7, 8));

        // Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        let numeroUno: any = cedula.substring(0, 1);
        numeroUno = (numeroUno * 2);
        if (numeroUno > 9) {
          numeroUno = (numeroUno - 9);
        }

        let numeroTres: any = cedula.substring(2, 3);
        numeroTres = (numeroTres * 2);
        if (numeroTres > 9) {
          numeroTres = (numeroTres - 9);
        }

        let numeroCinco: any = cedula.substring(4, 5);
        numeroCinco = (numeroCinco * 2);
        if (numeroCinco > 9) {
          numeroCinco = (numeroCinco - 9);
        }

        let numeroSiete: any = cedula.substring(6, 7);
        numeroSiete = (numeroSiete * 2);
        if (numeroSiete > 9) {
          numeroSiete = (numeroSiete - 9);
        }

        let numeroNueve: any = cedula.substring(8, 9);
        numeroNueve = (numeroNueve * 2);
        if (numeroNueve > 9) {
          numeroNueve = (numeroNueve - 9);
        }

        const impares = numeroUno + numeroTres + numeroCinco + numeroSiete + numeroNueve;

        // Suma total
        const sumaTotal = (pares + impares);

        // extraemos el primero digito
        const primerDigitoSuma = String(sumaTotal).substring(0, 1);

        // Obtenemos la decena inmediata
        const decena = (Number(primerDigitoSuma) + 1) * 10;

        // Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        let digitoValidador = decena - sumaTotal;

        // Si el digito validador es = a 10 toma el valor de 0
        if (digitoValidador === 10) {
          digitoValidador = 0;
        }

        // Validamos que el digito validador sea igual al de la cedula
        if (digitoValidador === ultimoDigito) {
          return true;
        } else {
          return false;
        }

      } else {
        // imprimimos en consola si la region no pertenece
        return false;
      }
    } else {
      // Imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      return false;
    }
  }


}
