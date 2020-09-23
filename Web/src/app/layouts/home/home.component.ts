import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../Models/Usuario';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tableData1;
  usuario: Usuario = new Usuario();

  constructor(private auth: AuthService) {
    this.usuario = auth.validarToken();
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
}
