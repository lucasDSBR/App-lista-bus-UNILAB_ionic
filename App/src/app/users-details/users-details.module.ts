import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersDetailsPageRoutingModule } from './users-details-routing.module';

import { UsersDetailsPage } from './users-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersDetailsPageRoutingModule
  ],
  declarations: [UsersDetailsPage]
})
export class UsersDetailsPageModule {}
