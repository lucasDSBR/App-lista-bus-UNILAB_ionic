import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ListsPageRoutingModule } from './lists-routing.module';

import { ListsPage } from './lists.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListsPageRoutingModule
  ],
  declarations: [ListsPage]
})
export class ListsPageModule {}
