import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ForgotpassRoutingModule} from './forgotpass-routing.module';
import {ForgotpassComponent} from './forgotpass.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ForgotpassComponent],
  imports: [
    CommonModule,
    FormsModule,
    ForgotpassRoutingModule
  ]
})
export class ForgotpassModule {
}
