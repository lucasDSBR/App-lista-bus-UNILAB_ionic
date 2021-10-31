import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateListsPage } from './create-lists.page';

const routes: Routes = [
  {
    path: '',
    component: CreateListsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateListsPageRoutingModule {}
