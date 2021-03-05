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
import {MailerService} from '../../services/mailer.service';
import {PdfMakeWrapper, Txt, Img, Table, Cell, Columns} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  paginadora = 'true';
  showBar = true;
  showFile = true;
  paginas = 10;
  PageActual = 1;
  filtro = '';
  test = 'width:0%'
  public tableData1;
  public tableData2;
  email: Email = new Email();
  usuario: Usuario = new Usuario();
  user: Usuario = new Usuario();
  timbrada: Timbrada = new Timbrada();
  images: Adjuntos = new Adjuntos();
  srcFoto: any = 'assets/img/default-avatar.png';
  idSelected: any;
  file = null;
  users: any = [];
  timbradas: any = [];
  showFoto: any;
  newFile = false;
  pageActual = 1;
  campus = 'Seleccione un campus';
  opcion = 'Seleccione la opcion';
  archivo: Timbrada = new Timbrada();
  dataList: any[];
  dataUser: any[] = [];
  paginador = 'true';


  constructor(private mail: MailerService, private auth: AuthService, private userServices: UserService, private alert: AlertService) {
    this.usuario = auth.validarToken();
  }

  CodificarArchivo(event, tipo) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.nombre = file.name;
        this.images.tipo = file.type;
        this.images.contenido = reader.result.toString().split(',')[1];
        if (tipo == 'foto') {
          this.images.descripcion = 'FOTO PERFIL';
          this.actualizarFoto();
          this.srcFoto = 'data:' + this.images.tipo + ';base64,' + this.images.contenido;
        } else {
          this.showBar = false;
          let valor = 1;
          let x = setInterval(() => {
            this.test = 'width:' + valor + '%';
            valor++;
            if (valor == 101) {
              this.showBar = true;
              this.showFoto = 'data:' + this.images.tipo + ';base64,' + this.images.contenido;
              this.showFile = false;
              this.test = 'width:' + 0 + '%';
              clearInterval(x);
            }
          }, 40);

        }

      };
    }
  }

  uploadFile() {
    if (this.images.descripcion) {
      if (this.idSelected.justificacion) {
        this.images.idAdjuntos = this.idSelected.justificacion.idAdjuntos;
      }
      this.userServices.uploadFile(this.images).subscribe((res: any) => {
        this.idSelected.justificacion = res.image.idAdjuntos;
        console.log(this.idSelected);
        this.idSelected.usuario = this.usuario.idBio;
        this.userServices.updateTimbrada(this.idSelected).subscribe((resp: any) => {
          this.idSelected.justificacion = res.image;
          this.alert.showNotification('success', 'pe-7s-bell', resp.message);
          this.images = new Adjuntos();
        }, err => {
        });
      }, err => {
        console.log(err);
      });

    } else {
      this.alert.showNotification('danger', 'pe-7s-bell', 'DEBES ESCRIBIR UNA DESCRIPCION');
    }


  }

  ngOnInit(): void {

    this.tableData1 = {
      headerRow: ['ID', 'Nombre', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4', 'Hora Diaria', '']
    };
    this.tableData2 = {
      headerRow: ['Id', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4', 'Hora Diaria']
    };

    this.obtenerPorId();
    this.obtenerTodasTimbradas();

  }

  obtenerPorId() {
    this.auth.getTimbradas(this.usuario.idBio).subscribe((res: any) => {
      this.tableData2.dataRows = res.timbrada;
    })
  }

  obtenerTodasTimbradas() {
    this.auth.getTodasTimbradas().subscribe((res: any) => {
      for (let i = 0; i < res.timbrada.length; i++) {
        if (res.timbrada[i].justificacion) {
          this.auth.getTimbradaById(res.timbrada[i].justificacion).subscribe((resp: any) => {
            res.timbrada[i].justificacion = resp.timbrada.justificacion;
          })
        }
      }
      this.tableData1.dataRows = res.timbrada;
      this.filtro = '';
      this.file = null;
    })
  }

  getDowloadName() {
    return `${this.idSelected.nombre}`
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

  loadFile() {
    this.showFoto = 'data:' + this.idSelected.justificacion.tipo + ';base64,' + this.idSelected.justificacion.contenido;
  }

  onChange(files: File[]) {
    this.users = [];
    this.file = files;
    this.archivo.idTimbradas = this.file[0].idTimbradas;
    if (files[0] && this.campus === 'Yavirac') {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result, file) => {
          this.dataList = result.data;
        }
      });
    } else {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = files[0];
      reader.onload = event => {
        const data = reader.result;
        workBook = XLSX.read(data, {type: 'binary'});
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.dataList = jsonData.Hoja1;
      };
      reader.readAsBinaryString(file);
    }

  }

  saveChange() {
    if (this.campus === 'Yavirac') {
      this.loadYaviracData();
    } else {
      this.loadOtherFormat();
    }

  }


  loadOtherFormat() {
    const datos = [];
    let objetoArchivo: Timbrada = new Timbrada();
    objetoArchivo.usuario = new Usuario();

    for (let i = 0; i < this.dataList.length; i++) {
      objetoArchivo.usuario.idBio = this.dataList[i].ID;
      objetoArchivo.fecha = this.dataList[i].Fecha.split(`'`)[0];
      objetoArchivo.usuario.nombre = this.dataList[i].Nombre;

      if (this.dataList[i].hasOwnProperty('Entrada')) {
        objetoArchivo.entrada = this.dataList[i].Entrada;
      }
      if (this.dataList[i].hasOwnProperty('Salida')) {
        objetoArchivo.almuerzo = this.dataList[i].Salida;
      }
      if (this.dataList[i].hasOwnProperty('Entrada_1')) {
        objetoArchivo.regresoAlmuerzo = this.dataList[i].Entrada_1;

      }
      if (this.dataList[i].hasOwnProperty('Salida_1')) {
        objetoArchivo.salida = this.dataList[i].Salida_1;
      }
      datos.push([objetoArchivo.usuario.idBio, objetoArchivo.usuario.nombre, objetoArchivo.fecha, objetoArchivo.entrada, objetoArchivo.almuerzo, objetoArchivo.regresoAlmuerzo, objetoArchivo.salida]);

      this.dataUser.push(objetoArchivo);
      objetoArchivo = new Timbrada();
      objetoArchivo.usuario = new Usuario();
    }
    this.tableData1.dataRows = datos;
    this.newFile = true;
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
    this.newFile = true;
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
        if (res.ok) {
          if (res.timbrada.entrada == null && this.dataUser[i].entrada != null) {
            res.timbrada.entrada = this.dataUser[i].entrada;
          }
          if (res.timbrada.almuerzo == null && this.dataUser[i].almuerzo != null) {
            res.timbrada.almuerzo = this.dataUser[i].almuerzo;
          }
          if (res.timbrada.regresoAlmuerzo == null && this.dataUser[i].regresoAlmuerzo != null) {
            res.timbrada.regresoAlmuerzo = this.dataUser[i].regresoAlmuerzo;
          }
          if (res.timbrada.salida == null && this.dataUser[i].salida != null) {
            res.timbrada.salida = this.dataUser[i].salida;
          }
          res.timbrada.fecha = res.timbrada.fecha.split('T')[0];
          this.guardarDatos(res.timbrada, i);
        }
      }, error => {
        if (error.error.err.message == 'EmptyResponse') {
          this.guardarDatos(this.dataUser[i], i);
        }
      });
      // if (i < this.dataUser.length) {
      //   this.alert.showNotification('success', 'pe-7s-bell', 'Se Terminado de cargar los Datos');
      // }
    }

  }

  guardarDatos(data, i) {
    this.auth.saveFile(data).subscribe(resp => {
      // console.log(resp);
      if (i == this.dataUser.length - 1) {
        this.alert.showNotification('success', 'pe-7s-bell', 'Se Terminado de cargar los Datos');
        this.obtenerTodasTimbradas();
        this.newFile = false;
      }
    }, err => {
      // console.log(err);
    });


  }

  sendJustification() {


    // this.userServices.getUserAdmin(2).subscribe((res: any) => {
    //   this.email.asunto = 'Notificacion';
    //   this.email.body = 'Se envio el email';
    //   const correo = [];
    //   for (let i = 0; i < res.user.length; i++) {
    //     correo.push(res.user[i].correo);
    //   }
    //   this.email.emails = correo.toString();
    //
    // })
    // this.email.body = this.mail.emailTemplate(this.email, 'Notificacion');
    // this.mail.notificacion(this.email).subscribe(res => {
    //   this.email = new Email();
    // });

  }

  HorasTrabajadas(item, i, tipo) {

    let valor1 = 0;
    let valor2 = 0;
    let valor3 = 0;
    let valor4 = 0;

    const t1 = new Date();
    const t2 = new Date();
    const t3 = new Date();
    const t4 = new Date();
    const total = new Date();


    if (item.entrada != null && item.salida != null) {
      valor1 = item.entrada.split(':');
      valor4 = item.salida.split(':');
      t1.setHours(valor1[0], valor1[1], valor1[2]);
      t4.setHours(valor4[0], valor4[1], valor4[2]);
      if (t4.getHours() > t1.getHours()) {
        const hora = t4.getHours() - t1.getHours();
        const minutos = t4.getMinutes() - t1.getMinutes()
        total.setHours(hora, minutos, 0);
      } else {
        const hora = t1.getHours() - t4.getHours();
        const minutos = t1.getMinutes() - t4.getMinutes()
        total.setHours(hora, minutos, 0);
      }
    }

    if (item.almuerzo != null && item.salida != null) {
      valor1 = item.almuerzo.split(':');
      valor4 = item.salida.split(':');
      t1.setHours(valor1[0], valor1[1], valor1[2]);
      t4.setHours(valor4[0], valor4[1], valor4[2]);
      if (t4.getHours() > t1.getHours()) {
        const hora = t4.getHours() - t1.getHours();
        const minutos = t4.getMinutes() - t1.getMinutes()
        total.setHours(hora, minutos, 0);
      } else {
        const hora = t1.getHours() - t4.getHours();
        const minutos = t1.getMinutes() - t4.getMinutes()
        total.setHours(hora, minutos, 0);
      }
    }

    if (item.entrada != null && item.almuerzo != null) {
      valor1 = item.entrada.split(':');
      valor4 = item.almuerzo.split(':');
      t1.setHours(valor1[0], valor1[1], valor1[2]);
      t4.setHours(valor4[0], valor4[1], valor4[2]);
      if (t4.getHours() > t1.getHours()) {
        const hora = t4.getHours() - t1.getHours();
        const minutos = t4.getMinutes() - t1.getMinutes()
        total.setHours(hora, minutos, 0);
      } else {
        const hora = t1.getHours() - t4.getHours();
        const minutos = t1.getMinutes() - t4.getMinutes()
        total.setHours(hora, minutos, 0);
      }
    }

    if (item.entrada != null && item.regresoAlmuerzo != null) {
      valor1 = item.entrada.split(':');
      valor4 = item.regresoAlmuerzo.split(':');
      t1.setHours(valor1[0], valor1[1], valor1[2]);
      t4.setHours(valor4[0], valor4[1], valor4[2]);
      if (t4.getHours() > t1.getHours()) {
        const hora = t4.getHours() - t1.getHours();
        const minutos = t4.getMinutes() - t1.getMinutes()
        total.setHours(hora, minutos, 0);
      } else {
        const hora = t1.getHours() - t4.getHours();
        const minutos = t1.getMinutes() - t4.getMinutes()
        total.setHours(hora, minutos, 0);
      }
    }

    if (item.entrada != null && item.almuerzo == null && item.regresoAlmuerzo == null && item.salida == null) {
      total.setHours(1, 0, 0);
    }
    if (item.almuerzo != null && item.entrada == null && item.regresoAlmuerzo == null && item.salida == null) {
      total.setHours(1, 0, 0);
    }
    if (item.regresoAlmuerzo != null && item.almuerzo == null && item.entrada == null && item.salida == null) {
      total.setHours(1, 0, 0);
    }
    if (item.salida != null && item.almuerzo == null && item.regresoAlmuerzo == null && item.entrada == null) {
      total.setHours(1, 0, 0);
    }

    if (item.salida == null && item.almuerzo == null && item.regresoAlmuerzo == null && item.entrada == null) {
      total.setHours(1, 0, 0);
    }

    if (item.idTimbradas == 728) {
      console.log('hora valida');
    }
    if (item.salida != null && item.almuerzo != null && item.regresoAlmuerzo != null && item.entrada != null) {
      const hora1 = new Date();
      const hora2 = new Date();
      total.setHours(1, 0, 0);
      valor1 = item.entrada.split(':');
      valor2 = item.almuerzo.split(':');
      valor3 = item.regresoAlmuerzo.split(':');
      valor4 = item.salida.split(':');
      t1.setHours(valor1[0], valor1[1], valor1[2]);
      t2.setHours(valor2[0], valor2[1], valor2[2]);
      t3.setHours(valor3[0], valor3[1], valor3[2]);
      t4.setHours(valor4[0], valor4[1], valor4[2]);

      if (t2.getHours() > t1.getHours()) {
        const hora = t2.getHours() - t1.getHours();
        const minutos = t2.getMinutes() - t1.getMinutes()
        hora1.setHours(hora, minutos, 0);
      } else {
        const hora = t1.getHours() - t2.getHours();
        const minutos = t1.getMinutes() - t2.getMinutes()
        hora1.setHours(hora, minutos, 0);
      }

      if (t4.getHours() > t3.getHours()) {
        const hora = t4.getHours() - t3.getHours();
        const minutos = t4.getMinutes() - t3.getMinutes()
        hora2.setHours(hora, minutos, 0);
      } else {
        const hora = t3.getHours() - t4.getHours();
        const minutos = t3.getMinutes() - t4.getMinutes()
        hora2.setHours(hora, minutos, 0);
      }

      const horaTotal = hora2.getHours() + hora1.getHours();
      const minutosTotal = hora2.getMinutes() + hora1.getMinutes();
      total.setHours(horaTotal, minutosTotal, 0);
    }

    item.total = total;

    if (tipo === 'clase') {
      if (total.getHours() < 8) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  uploadJustificacion(item) {
    this.idSelected = item;
    this.showFile = true;
    this.images = new Adjuntos();
  }

  loadJustificacion(item) {
    this.showFile = false;
    this.idSelected = item;
    this.images.descripcion = item.justificacion.descripcion;
    this.loadFile();
  }

  // generarPdf() {
  //   const data = [];
  //   data.push(['Nombre', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4'])
  //   for (let i = 0; i < this.tableData1.dataRows.length; i++) {
  //     // tslint:disable-next-line:max-line-length
  //     data.push([this.tableData1.dataRows[i].nombre, this.tableData1.dataRows[i].fecha.split('T')[0], this.tableData1.dataRows[i].entrada, this.tableData1.dataRows[i].almuerzo, this.tableData1.dataRows[i].regresoAlmuerzo, this.tableData1.dataRows[i].salida])
  //   }
  //   PdfMakeWrapper.setFonts(pdfFonts);
  //   const pdf = new PdfMakeWrapper();
  //
  //   pdf.add(
  //     new Txt('INSTITUTO TECNOLÓGICO SUPERIOR "YAVIRAC"').alignment('center').italics().color('red').end
  //   );
  //   pdf.add(
  //     pdf.ln(1)
  //   );
  //   pdf.add(
  //     new Txt('Listado de docentes del Instituto Tecnológico Superior "Yavirac" con sus respectivas timbradas.').alignment('left').color('blue').end
  //   );
  //   pdf.add(
  //     pdf.ln(1)
  //   );
  //   pdf.add(
  //     new Table(
  //       data,
  //     ).color('black').layout('lightHorizontalLines').end
  //   );
  //   pdf.pageSize('A4');
  //   pdf.create().open()
  // }
}
