import {Routes} from '@angular/router';

import {HomeComponent} from '../home/home.component';
import {ConfigComponent} from '../config/config.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {path: 'principal', component: HomeComponent},
  {path: 'configuracion', component: ConfigComponent},
];
