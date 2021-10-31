import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CreateListsPageRoutingModule } from './create-lists-routing.module';

import { CreateListsPage } from './create-lists.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CreateListsPageRoutingModule
  ],
  declarations: [CreateListsPage]
})
export class CreateListsPageModule {}
