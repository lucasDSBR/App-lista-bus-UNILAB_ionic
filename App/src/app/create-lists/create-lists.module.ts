import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateListsPageRoutingModule } from './create-lists-routing.module';

import { CreateListsPage } from './create-lists.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateListsPageRoutingModule
  ],
  declarations: [CreateListsPage]
})
export class CreateListsPageModule {}
