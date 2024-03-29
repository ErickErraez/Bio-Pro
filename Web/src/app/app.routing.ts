import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthGuard} from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full',
  },

  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'login/identity', loadChildren: () => import('./forgotpass/forgotpass.module').then(m => m.ForgotpassModule)},
  {
    path: 'web',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'web'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule {
}
