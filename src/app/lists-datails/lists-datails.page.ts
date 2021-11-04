import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ListaService } from '../../Service/Lista.service';
import { Usuariolista } from '../../Model/Usuariolista.model';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserLista } from '../../Model/UserLista.model';
import { ListsPage } from '../lists/lists.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lists-datails',
  templateUrl: './lists-datails.page.html',
  styleUrls: ['./lists-datails.page.scss'],
  providers: [ListaService]
})

export class ListsDatailsPage implements OnInit {
  @Input() idLista: string;
  @Input() tokenUser: string;
  @Input() idUser: string;
  @Input() NameUser: string;


  perfil = localStorage.getItem('perfil');

  public listsPage: ListsPage;
  public totalUsers: number;
  public data: Usuariolista[] = []
  constructor(
    private router: Router,
    private listaServices: ListaService,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private route: ActivatedRoute
    ) { }



  ngOnInit() {

  }

  ionViewWillEnter() {
    this.listaServices.getListaId(this.idLista)
    .then((resposta: any)=>{
        this.data = resposta.users
        console.log(resposta)
    })
  }

  sairDetalheLista() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  entrarLista(acoes: any){
    this.listaServices.getListaId(this.idLista).then((resposta: any)=>{
      this.inserirUsuarioNaLista(resposta.users, acoes)
    })
  }

  sairDaLista(){
    var usuariosNaLista = this.data
    const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
    const index = usuariosNaLista.indexOf(user)
    if (index > -1) {
      usuariosNaLista.splice(index, 1);
    }

    let data = {users: usuariosNaLista}
    this.listaServices.sairDaListaId(data, this.idLista)
    .toPromise().then((resposta: any) => {
      this.ionViewWillEnter()
    }).catch((err) => {
      console.log(err.message)
    })
  }

  editarSituacaoUsuario(acoes: any){
    var usuariosNaLista = this.data
    const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
    const index = usuariosNaLista.indexOf(user)
    if (index > -1) {
      usuariosNaLista.splice(index, 1);
    }
    usuariosNaLista.push({
      name: this.NameUser,
      idPrincipal: this.idUser,
      vai: acoes[0] == 1? true : false,
      volta: acoes[1] == 2? true : acoes[0] == 2? true : false,
      situacao: true
    })

    console.log(usuariosNaLista)

    let data = {users: usuariosNaLista}
    this.listaServices.editarSituacao(data, this.idLista)
    .toPromise().then((resposta: any) => {
      console.log(resposta)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  inserirUsuarioNaLista(users: any, acoes){
    users.push(
      {
        name: this.NameUser, 
        idPrincipal: this.idUser, 
        situacao: true, 
        vai: acoes[0] == 1? true : false,
        volta: acoes[1] == 2? true : acoes[0] == 2? true : false,
      }
    );
    let data = {users: users}
    this.listaServices.entrarNaLista(data, this.idLista)
    .toPromise().then((resposta: any) => {
      this.ionViewWillEnter()
    }).catch((err) => {
      console.log(err.message)
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      cssClass: 'alertCancel',
      buttons: [{
        text: 'Entrar na lista',
        role: 'destructive',
        handler: () => {
          if(this.data.length == this.totalUsers){
            this.alerta('Desculpe. Alista já está com o limite de usuários...');
          }else{
            this.entrarNaLista();
          }
        }
      }, 
      {
        text: 'Editar situação',
        handler: () => {
          this.editarSituacao()
        }
      },
      {
        text: 'Excluir lista(Admin)',
        handler: () => {
          if(this.perfil == 'admin'){
            this.excluirLista()
          }else{
            this.alerta('Desculpe. Apenas administradores podem realizar essa ação.');
          }
        }
      }, 
      {
        text: 'Sair da lista',
        handler: () => {
          this.confirmacaoSairLista();
        }
      }]
    });
    await actionSheet.present();
  }
  async confirmacaoSairLista(){
    const alerta = await this.alertController.create({
      header: "Deseja realmente sair da lista ?",
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.sairDaLista()
          }
        }
      ]
    });
    await alerta.present();
  }
  async alerta(mensagem: string){
    const alerta = await this.alertController.create({
      header: mensagem,
      cssClass: 'alertDanger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () =>{
            this.router.navigate(['', 'dashboard'])
          },
          cssClass: 'alertDanger'
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
          handler: (acoes) => {
            if(acoes.length == 0)
              this.alerta("Uma opção deve ser selecionada...");
            //outras ações:
            this.editarSituacaoUsuario(acoes)
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


  excluirLista(){
    this.listaServices.delListaId(this.idLista, this.tokenUser)
        .toPromise().then((resposta: any) => {
          if(resposta == null){
            this.alerta('Lista excluida com sucesso!');
            this.sairDetalheLista()
            
          }
        }).catch((err) => {
          console.log(err.message)
        })
  }
}
