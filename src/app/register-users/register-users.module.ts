import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RegisterUsersPageRoutingModule } from './register-users-routing.module';

import { RegisterUsersPage } from './register-users.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterUsersPageRoutingModule
  ],
  declarations: [RegisterUsersPage]
})
export class RegisterUsersPageModule {}
