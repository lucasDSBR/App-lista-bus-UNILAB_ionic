import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/Usuario.service';
import { User } from '../../Model/User.model';
import { ModalController } from '@ionic/angular';
import { UsersDetailsPage } from '../users-details/users-details.page';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [UsuarioService]
})
export class UsersPage {
  tokenUser = localStorage.getItem('isAutenticado');
  data = [];
  loading = true;
  semUser = false;
  constructor(
    public modalController: ModalController,
    private usuarioService: UsuarioService
  ) { }


  async presentModal(idUser) {
    const modal = await this.modalController.create({
      component: UsersDetailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': idUser,
        'tokenUser': this.tokenUser
      }
    });
    return await modal.present();
  }

  ionViewWillEnter() {
    this.usuarioService.getUsuarios(this.tokenUser).toPromise().then((resposta: any) => {
      this.data = resposta.items
      this.loading = false
      if(this.data.length == 0) {
        this.semUser = true
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

}
