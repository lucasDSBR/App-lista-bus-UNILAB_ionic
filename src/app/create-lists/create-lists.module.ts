import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreateListsPageRoutingModule } from './create-lists-routing.module';

import { CreateListsPage } from './create-lists.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CreateListsPageRoutingModule
  ],
  declarations: [CreateListsPage]
})
export class CreateListsPageModule {}
