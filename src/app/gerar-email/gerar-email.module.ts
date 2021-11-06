import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerarEmailPageRoutingModule } from './gerar-email-routing.module';

import { GerarEmailPage } from './gerar-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerarEmailPageRoutingModule
  ],
  declarations: [GerarEmailPage]
})
export class GerarEmailPageModule {}
