import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersDetailsPage } from './users-details.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UsersDetailsPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersDetailsPageRoutingModule {}
