import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';
const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
