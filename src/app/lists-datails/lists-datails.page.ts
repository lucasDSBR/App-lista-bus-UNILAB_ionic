import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../../Service/Lista.service';
import { Usuariolista } from '../../Model/Usuariolista.model';
import { ActivatedRoute } from '@angular/router';
import { UserLista } from '../../Model/UserLista.model';
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
    public actionSheetController: ActionSheetController,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {    
  }


  ngAfterViewInit() {
    this.listaServices.getListaId(this.Id).then((resposta: any)=>{
      this.data = resposta.users
    })
  }

  entrarLista(acoes: any){
    this.listaServices.getListaId(this.Id).then((resposta: any)=>{
      this.inserirUsuarioNaLista(resposta.users, acoes)
    })
  }

  inserirUsuarioNaLista(users: any, acoes){
    users.push(
      {
        name: "Lucas Silva2", 
        idPrincipal: "423423", 
        situacao: true, 
        vai: acoes[0] == 1? true : false,
        volta: acoes[1] == 2? true : acoes[0] == 2? true : false,
      }
    );

    let teste = {users: users}


    console.log(teste)
    this.listaServices.entrarNaLista(teste, this.Id)
    .toPromise().then((resposta: any) => {
      console.log(resposta)
    }).catch((err) => {
      console.log(err.message)
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
          value: 1
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
            this.entrarLista("asd")
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
            this.entrarLista(data)
          }
        }
      ]

    });
    await confirmacao.present()
  }

}
