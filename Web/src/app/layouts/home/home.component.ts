import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../Models/Usuario';
import {AuthService} from '../../services/auth.service';
import {Adjuntos} from '../../Models/Adjuntos';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tableData1;
  usuario: Usuario = new Usuario();
  images: Adjuntos = new Adjuntos();
  srcFoto: any = 'assets/img/default-avatar.png';

  constructor(private auth: AuthService, private userServices: UserService, private alert: AlertService) {
    this.usuario = auth.validarToken();
    console.log(this.usuario);
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.nombre = file.name;
        this.images.descripcion = 'FOTO PERFIL';
        this.images.tipo = file.type;
        this.images.contenido = reader.result.toString().split(',')[1];
        this.actualizarFoto();
        this.srcFoto = 'data:' + this.images.tipo + ';base64,' + this.images.contenido;
      };
    }
  }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['ID', 'Nombre', 'Entrada', 'Almuerzo', 'Regreso Almuerzo', 'Salida', 'Justificar'],
      dataRows: [
        ['1', 'Dakota Rice', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
        ['2', 'Dakota Rice', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
        ['3', 'Dakota Rice', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
        ['4', 'Dakota Rice', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
        ['5', 'Dakota Rice', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
        ['6', 'Dakota Rice', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
    };
  }

  actualizarFoto() {
    if (this.usuario.foto == null) {
      this.userServices.actualizarFoto(this.images).subscribe((res: any) => {
        this.usuario.foto = res.response;
        this.userServices.actualizarUsuarioFoto(this.usuario).subscribe((usuario: Usuario) => {
          this.alert.showNotification('success', 'pe-7s-bell', res.message)
        });
      }, err => {
        console.log(err);
      });
    } else {
      this.images.idAdjuntos = this.usuario.foto.idAdjuntos;
      this.userServices.actualizarFoto(this.images).subscribe((res: any) => {
        this.usuario.foto = res.response;
        this.alert.showNotification('success', 'pe-7s-bell', res.message)
      }, err => {
        console.log(err);
      });
    }

  }

  validarFoto() {
    if (this.usuario.foto === null) {
      return this.srcFoto;
    } else {
      return this.srcFoto = 'data:' + this.usuario.foto.tipo + ';base64,' + this.usuario.foto.contenido;
    }
  }

}
