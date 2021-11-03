import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateListsPage } from './create-lists.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';

const routes: Routes = [
  {
    path: '',
    component: CreateListsPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateListsPageRoutingModule {}
