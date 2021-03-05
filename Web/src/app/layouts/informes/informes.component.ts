import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PdfMakeWrapper, Txt, Img, Table, Cell, Columns} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // fonts provided for pdfmake
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  public tableData1;
  paginas = 10;
  pageActual = 1;
  paginador = 'true';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['ID', 'Nombre', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4', 'Hora Diaria', '']
    };
    this.obtenerTodasTimbradas();
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
    })
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
  generarPdf() {
    const data = [];
    data.push(['Nombre', 'Fecha', 'Timbrada 1', 'Timbrada 2', 'Timbrada 3', 'Timbrada 4'])
    for (let i = 0; i < this.tableData1.dataRows.length; i++) {
      // tslint:disable-next-line:max-line-length
      data.push([this.tableData1.dataRows[i].nombre, this.tableData1.dataRows[i].fecha.split('T')[0], this.tableData1.dataRows[i].entrada, this.tableData1.dataRows[i].almuerzo, this.tableData1.dataRows[i].regresoAlmuerzo, this.tableData1.dataRows[i].salida])
    }
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();

    pdf.add(
      new Txt('INSTITUTO TECNOLÓGICO SUPERIOR "YAVIRAC"').alignment('center').italics().color('red').end
    );
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(
      new Txt('Listado de docentes del Instituto Tecnológico Superior "Yavirac" con sus respectivas timbradas.').alignment('left').color('blue').end
    );
    pdf.add(
      pdf.ln(1)
    );
    pdf.add(
      new Table(
        data,
      ).color('black').layout('lightHorizontalLines').end
    );
    pdf.pageSize('A4');
    pdf.create().open()
  }
}
