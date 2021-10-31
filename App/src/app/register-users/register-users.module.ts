import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterUsersPageRoutingModule } from './register-users-routing.module';

import { RegisterUsersPage } from './register-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterUsersPageRoutingModule
  ],
  declarations: [RegisterUsersPage]
})
export class RegisterUsersPageModule {}
