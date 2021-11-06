import { Component, OnInit,ViewChild } from '@angular/core';
import { ListaService } from '../../Service/Lista.service';
import { ListsDatailsPage } from '../lists-datails/lists-datails.page';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  providers:[ListaService]
})
export class ListsPage implements OnInit {
  slideOpts = {
    initialSlide: 0
  }
  tokenUser = localStorage.getItem('isAutenticado');
  idUser = localStorage.getItem('id');
  NameUser = localStorage.getItem('name');
  loading = true;
  semUser = false;
  data = []


  constructor(
    public modalController: ModalController,
    private listaServices: ListaService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listaServices.getLista().then((resposta: any) => {
      this.loading = false;
      this.data = resposta.items
      if(this.data.length == 0) {
        this.semUser = true
      }
    }).catch((err) => {

    })
  }

  async presentModal(idList) {
    const modal = await this.modalController.create({
      component: ListsDatailsPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idLista': idList,
        'tokenUser': this.tokenUser,
        'idUser': this.idUser,
        'NameUser': this.NameUser
      }
    });
    return await modal.present();
  }

  
}
