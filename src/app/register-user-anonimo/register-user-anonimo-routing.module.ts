import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterUserAnonimoPage } from './register-user-anonimo.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterUserAnonimoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterUserAnonimoPageRoutingModule {}
