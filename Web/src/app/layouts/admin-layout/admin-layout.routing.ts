import {Routes} from '@angular/router';

import {HomeComponent} from '../home/home.component';
import {ConfigComponent} from '../config/config.component';
import {RolesComponent} from '../roles/roles.component';
import {AddUsersComponent} from '../add-users/add-users.component';
import {InformesComponent} from '../informes/informes.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {path: 'principal', component: HomeComponent},
  {path: 'configuracion', component: ConfigComponent},
  {path: 'roles', component: RolesComponent},
  {path: 'addUsers', component: AddUsersComponent},
  {path: 'informes', component: InformesComponent},
];
