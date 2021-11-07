import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RegisterUserAnonimoPageRoutingModule } from './register-user-anonimo-routing.module';

import { RegisterUserAnonimoPage } from './register-user-anonimo.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterUserAnonimoPageRoutingModule
  ],
  declarations: [RegisterUserAnonimoPage]
})
export class RegisterUserAnonimoPageModule {}
