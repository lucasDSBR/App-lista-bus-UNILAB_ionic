import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListsDatailsPageRoutingModule } from './lists-datails-routing.module';

import { ListsDatailsPage } from './lists-datails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListsDatailsPageRoutingModule
  ],
  declarations: [ListsDatailsPage]
})
export class ListsDatailsPageModule {}
