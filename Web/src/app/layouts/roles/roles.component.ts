import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../Models/Usuario';
import {Rol} from '../../Models/Rol';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public tableData1;
  user: Usuario = new Usuario();
  pageActual = 1;
  paginador = 'true';
  paginas = 5;
  filtro = '';

  constructor(private alert: AlertService, private auth: AuthService) {
    this.user = auth.validarToken();
    this.tableData1 = {
      headerRow: ['ID', 'Nombre', 'Correo', 'Rol'],
    };


  }

  ngOnInit(): void {
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

}
