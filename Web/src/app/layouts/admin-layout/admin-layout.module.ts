import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NguiMapModule} from '@ngui/map';

import {AdminLayoutRoutes} from './admin-layout.routing';

import {HomeComponent} from '../home/home.component';
import {ConfigComponent} from '../config/config.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../../services/filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [
    HomeComponent,
    FilterPipe
  ],
  declarations: [
    HomeComponent,
    ConfigComponent,
    FilterPipe,
  ]
})

export class AdminLayoutModule {
}
