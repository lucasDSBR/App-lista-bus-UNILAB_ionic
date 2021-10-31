import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../../Service/Lista.service';
import { Usuariolista } from '../../Model/Usuariolista.model';
@Component({
  selector: 'app-lists-datails',
  templateUrl: './lists-datails.page.html',
  styleUrls: ['./lists-datails.page.scss'],
  providers: [ListaService]
})
export class ListsDatailsPage implements OnInit {
  public data: Usuariolista[] = []
  Id = "617d37512c5c6e8114deec2d"
  constructor(
    private listaServices: ListaService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController
    ) { }

  ngOnInit() {    
  }


  ngAfterViewInit() {
    this.Users()
  }
  async Users(){
    await this.listaServices.getListaId(this.Id).then((resposta: any)=>{
      this.data = resposta.users
    })
  }

  entrarLista(){
    this.listaServices.getListaId(this.Id).then((resposta: any)=>{
      console.log(resposta.users)
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      buttons: [{
        text: 'Entrar na lista',
        role: 'destructive',
        handler: () => {
          this.entrarNaLista();
        }
      }, {
        text: 'Editar situação',
        handler: () => {
          this.editarSituacao()
        }
      }, {
        text: 'Sair da lista',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async alerta(mensagem: string){
    const alerta = await this.alertController.create({
      header: mensagem,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    await alerta.present();
  }

  async editarSituacao(){
    const editSituacao = await this.alertController.create({
      header: 'Escolha uma ação:',
      inputs:[
        {
          label: 'Vou para Redenção',
          name: 'Vou',
          type: 'checkbox',
          value: 1
        },
        {
          label: 'Volto para Pentecoste',
          name: 'Volto',
          type: 'checkbox',
          value: 2
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'my-custom-class',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            if(data.length == 0)
              this.alerta("Uma opção deve ser selecionada...");
            //outras ações:
            this.entrarLista()
          }
        }
      ]
    });
    await editSituacao.present();
  }

  async entrarNaLista(){
    const confirmacao = await this.alertController.create({
      header: 'Escolha uma ação:',
      inputs: [
        {
          label: 'Vou para Redenção',
          name: 'Vou',
          type: 'checkbox',
          value: 1
        },
        {
          label: 'Volto para Pentecoste',
          name: 'Volto',
          type: 'checkbox',
          value: 2
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'my-custom-class',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            if(data.length == 0)
              this.alerta("Uma opção deve ser selecionada...");
            //outras ações:
            console.log(data)
          }
        }
      ]

    });
    await confirmacao.present()
  }

}
