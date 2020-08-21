import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'principal',
        pathMatch: 'full',
    },
    { path: 'principal',      component: HomeComponent },
];
