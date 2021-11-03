import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsPage } from './lists.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListsPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsPageRoutingModule {}
