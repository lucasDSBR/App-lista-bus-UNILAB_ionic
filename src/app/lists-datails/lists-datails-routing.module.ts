import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsDatailsPage } from './lists-datails.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListsDatailsPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsDatailsPageRoutingModule {}
