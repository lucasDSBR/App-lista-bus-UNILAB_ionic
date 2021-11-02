import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ListsDatailsPageRoutingModule } from './lists-datails-routing.module';

import { ListsDatailsPage } from './lists-datails.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ListsDatailsPageRoutingModule
  ],
  declarations: [ListsDatailsPage]
})
export class ListsDatailsPageModule {}
