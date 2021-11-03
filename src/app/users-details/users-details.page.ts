import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../Service/Usuario.service';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
  providers: [UsuarioService]
})

export class UsersDetailsPage implements OnInit {
  @Input() id: string;
  @Input() tokenUser: string
  data = []
  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private usuarioService: UsuarioService,
    public modalController: ModalController
  ) { }
  sairDoDetalhe() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {
    console.log(this.id)
  }

  ngAfterViewInit(){
    this.usuarioService.getUsuarioId(this.id, this.tokenUser)
    .toPromise().then((resposta: any) => {
      this.data = resposta
    }).catch((err) => {
      console.log(err.message)
    })
  }

  async confirmarExclusao(){
    const editSituacao = await this.alertController.create({
      header: 'Quer realmente excluir este usuário ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'my-custom-class'
        }, {
          text: 'Sim',
          handler: () => {
            this.excluirUser()
          }
        }
      ]
    });
    await editSituacao.present();
  }

  async alerta(msg: string){
    const editSituacao = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.excluirUser()
          }
        }
      ]
    });
    await editSituacao.present();
  }

  excluirUser(){
    this.usuarioService.delUsuarioId(this.id, this.tokenUser)
    .toPromise().then((resposta: any) => {
      if(resposta == null){
        this.alerta('Usuário excluido com sucesso!');
        this.sairDoDetalhe()
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

}
