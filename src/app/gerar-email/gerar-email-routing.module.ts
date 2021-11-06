import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerarEmailPage } from './gerar-email.page';
import { AutenticacaoGuard } from '../../Service/autenticacao-guard.service';

const routes: Routes = [
  {
    path: '',
    component: GerarEmailPage,
    canActivate: [AutenticacaoGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerarEmailPageRoutingModule {}
