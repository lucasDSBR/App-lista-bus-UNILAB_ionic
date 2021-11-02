import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RegisterUsersPageRoutingModule } from './register-users-routing.module';

import { RegisterUsersPage } from './register-users.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegisterUsersPageRoutingModule
  ],
  declarations: [RegisterUsersPage]
})
export class RegisterUsersPageModule {}
