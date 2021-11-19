import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerarEmailPageRoutingModule } from './gerar-email-routing.module';

import { GerarEmailPage } from './gerar-email.page';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import {File} from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Document, Packer } from 'docx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerarEmailPageRoutingModule
  ],
  declarations: [GerarEmailPage],
  providers: [Base64, File, AndroidPermissions, SocialSharing]
})
export class GerarEmailPageModule {}
