import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../Models/Usuario';
import {AuthService} from '../../services/auth.service';
import {Adjuntos} from '../../Models/Adjuntos';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {Timbrada} from '../../Models/Timbrada';
import * as Papa from 'papaparse';

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
  file = null;
  users: any = [];
  pageActual = 1;
  campus = 'Seleccione un campus';
  archivo: Timbrada = new Timbrada();
  dataList: any[];
  dataUser: any[] = [];


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
      headerRow: ['ID', 'valor', 'Nombre', 'Fecha', 'Entrada', 'Almuerzo', 'Regreso', 'Salida']
    };
  }

  actualizarFoto() {
    if (this.usuario.foto == null) {
      this.userServices.actualizarFoto(this.images).subscribe((res: any) => {
        this.usuario.foto = res.response;
        this.userServices.actualizarUsuarioFoto(this.usuario).subscribe((usuario: Usuario) => {
          this.alert.showNotification('success', 'pe-7s-bell', res.message);
        });
      }, err => {
        console.log(err);
      });
    } else {
      this.images.idAdjuntos = this.usuario.foto.idAdjuntos;
      this.userServices.actualizarFoto(this.images).subscribe((res: any) => {
        this.usuario.foto = res.response;
        this.alert.showNotification('success', 'pe-7s-bell', res.message);
      }, err => {
        console.log(err);
      });
    }

  }

  valor(value: string) {
    this.campus = value;
  }

  validarFoto() {
    if (this.usuario.foto === null) {
      return this.srcFoto;
    } else {
      return this.srcFoto = 'data:' + this.usuario.foto.tipo + ';base64,' + this.usuario.foto.contenido;
    }
  }

  onChange(files: File[]) {


    this.users = [];
    this.file = files;
    this.archivo.idTimbradas = this.file[0].idTimbradas;
    if (files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          if (this.campus === 'Yavirac') {
            this.loadYaviracData(result.data);
          }
          if (this.campus === 'Cenepa') {

          }
        }
      });
    }

  }

  loadYaviracData(data) {
    this.dataList = data;
    const objetoArchivo: any = {};
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i + 1] != undefined && this.dataList[i] != undefined) {
        if (this.dataList[i].idTimbradas == this.dataList[i + 1].idTimbradas) {
          objetoArchivo.idTimbradas = this.dataList[i].id;
          objetoArchivo.entrada = this.dataList[i].hora;
          objetoArchivo.almuerzo = this.dataList[i].hora;
          objetoArchivo.regresoAlmuerzo = this.dataList[i].hora;
          objetoArchivo.salida = this.dataList[i].hora;
          this.dataUser.push([i, objetoArchivo.idTimbradas, this.dataList[i].nombre, this.dataList[i].fecha, objetoArchivo.entrada, objetoArchivo.almuerzo, objetoArchivo.regresoAlmuerzo, objetoArchivo.salida]);
          this.tableData1.dataRows = this.dataUser.sort(
            // function (a, b) {
            //   console.log(a)
            //   console.log(b.nombre)
            //   if (a.nombre > b.nombre) {
            //     return 1;
            //   }
            //   if (a.nombre < b.nombre) {
            //     return -1;
            //   }
            //   // a must be equal to b
            //   return 0;
            // }
            //
          );
        }
      }
    }
  }

}
