import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../Models/Usuario';
import {AuthService} from '../../services/auth.service';
import {Adjuntos} from '../../Models/Adjuntos';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import {Timbrada} from '../../Models/Timbrada';
import * as Papa from 'papaparse';
import {split} from 'ts-node';
import {Email} from '../../Models/Email';
import {MailerService} from "../../services/mailer.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  paginadora = 'true';
  horasTotales: 0;
  paginas = 5;
  filtro = '';
  public tableData1;
  public tableData2;
  public tableData3;
  email: Email = new Email();
  usuario: Usuario = new Usuario();
  user: Usuario = new Usuario();
  timbrada: Timbrada = new Timbrada();
  images: Adjuntos = new Adjuntos();
  srcFoto: any = 'assets/img/default-avatar.png';
  file = null;
  users: any = [];
  timbradas: any = [];
  pageActual = 1;
  campus = 'Seleccione un campus';
  archivo: Timbrada = new Timbrada();
  dataList: any[];
  dataUser: any[] = [];
  paginador = 'false';


  constructor(private mail: MailerService, private auth: AuthService, private userServices: UserService, private alert: AlertService) {
    this.usuario = auth.validarToken();
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
      headerRow: ['ID', 'Nombre', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4']
    };
    this.tableData2 = {
      headerRow: ['Id', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4', 'Hora Diaria']
    };
    this.auth.getTimbradas(this.usuario.idBio).subscribe((res: any) => {
      this.tableData2.dataRows = res.timbrada;
    })

    this.auth.getTodasTimbradas().subscribe((res: any) => {
      this.tableData2.dataRows = res.timbrada;
      console.log(res.timbrada)
      for (let i = 0; i < res.timbrada[i].usuario.nombre.length; i++) {
        console.log(res.timbrada[i].usuario.nombre);
      }
    })
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
          this.dataList = result.data;

        }
      });
    }

  }

  saveChange() {
    if (this.campus === 'Yavirac') {
      this.loadYaviracData();
    }
    if (this.campus === 'Cenepa') {

    }
  }

  loadYaviracData() {
    this.paginador = 'true';
    this.dataList.sort(
      function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }
    );
    const datos = [];
    let objetoArchivo: Timbrada = new Timbrada();
    objetoArchivo.usuario = new Usuario();

    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i] != undefined) {
        objetoArchivo.usuario.idBio = this.dataList[i].id;
        objetoArchivo.fecha = this.dataList[i].fecha;
        objetoArchivo.usuario.nombre = this.dataList[i].nombre;
        const x = this.validarHora(this.dataList[i].hora);
        switch (x) {
          case 'entrada':
            objetoArchivo.entrada = this.dataList[i].hora;
            break;
          case 'almuerzo':
            objetoArchivo.almuerzo = this.dataList[i].hora;
            break;
          case 'finalmuerzo':
            objetoArchivo.regresoAlmuerzo = this.dataList[i].hora;
            break;
          case 'salida':
            objetoArchivo.salida = this.dataList[i].hora;
            break;
        }

        if (this.dataList[i + 1] != undefined) {
          if (this.dataList[i].fecha == this.dataList[i + 1].fecha && this.dataList[i].id == this.dataList[i + 1].id) {
            const y = this.validarHora(this.dataList[i + 1].hora);
            switch (y) {
              case 'entrada':
                objetoArchivo.entrada = this.dataList[i + 1].hora;
                break;
              case 'almuerzo':
                objetoArchivo.almuerzo = this.dataList[i + 1].hora;
                break;
              case 'finalmuerzo':
                objetoArchivo.regresoAlmuerzo = this.dataList[i + 1].hora;
                break;
              case 'salida':
                objetoArchivo.salida = this.dataList[i + 1].hora;
                break;
            }
            delete this.dataList[i + 1];
          }
        } else {
          const y = this.validarHora(this.dataList[i].hora);
          switch (y) {
            case 'entrada':
              objetoArchivo.entrada = this.dataList[i].hora;
              break;
            case 'almuerzo':
              objetoArchivo.almuerzo = this.dataList[i].hora;
              break;
            case 'finalmuerzo':
              objetoArchivo.regresoAlmuerzo = this.dataList[i].hora;
              break;
            case 'salida':
              objetoArchivo.salida = this.dataList[i].hora;
              break;
          }
        }
        datos.push([objetoArchivo.usuario.idBio, objetoArchivo.usuario.nombre, objetoArchivo.fecha, objetoArchivo.entrada, objetoArchivo.almuerzo, objetoArchivo.regresoAlmuerzo, objetoArchivo.salida]);
        this.dataUser.push(objetoArchivo);
        objetoArchivo = new Timbrada();
        objetoArchivo.usuario = new Usuario();
      }
    }
    this.tableData1.dataRows = datos;
  }

  validarHora(hora) {

    if (hora.split(':')[0] <= 10) {
      return 'entrada';
    }

    if (hora.split(':')[0] >= 11 && hora.split(':')[0] <= 15) {
      return 'almuerzo';
    }

    if (hora.split(':')[0] >= 13 && hora.split(':')[0] <= 16) {
      return 'finalmuerzo';
    }

    if (hora.split(':')[0] >= 17) {
      return 'salida';
    }

  }

  guardar() {
    for (let i = 0; i < this.dataUser.length; i++) {
      this.auth.getData(this.dataUser[i]).subscribe((res: any) => {
        console.log(res);
      }, error => {
        console.log(error);
        if (error.error.err.message == 'EmptyResponse') {
          this.auth.saveFile(this.dataUser[i]).subscribe(resp => {
            console.log(resp);
          }, err => {
            console.log(err);
          });
        }
      });
    }
  }

  enviarEmail() {

    this.userServices.getUserAdmin(2).subscribe((res: any) => {
      console.log(res.user);
      this.email.asunto = 'Notificacion';
      this.email.body = 'Se envio el email';
      var correo = [];
      for (let i = 0; i < res.user.length; i++) {
        correo.push(res.user[i].correo);
      }
      this.email.emails = correo.toString();

    })
    this.email.body = this.mail.emailTemplate(this.email, 'Notificacion');
    this.mail.notificacion(this.email).subscribe(res => {
      this.email = new Email();
    });

  }

  HorasTrabajadas(item, i) {
    this.horasTotales = (item.entrada + item.almuerzo + item.regresoAlmuerzo + item.salida);
    let valor1;
    let valor2;
    let valor3;
    let valor4;
    valor1 = this.horasTotales.toString().substr(0, 0);
    valor2 = this.horasTotales.toString().substr(1, 1);
    valor3 = this.horasTotales.toString().substr(2, 1);
    valor4 = this.horasTotales.toString().substr(3, 2);
    const total = valor1 + valor2 + valor3 + valor4;
    this.horasTotales = total;
  }
}
