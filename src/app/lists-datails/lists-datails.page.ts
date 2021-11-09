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
import { ToastController } from '@ionic/angular';

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
  public limiteUsers: number;
  public data = []
  public vagasApenasIr = 0;
  public vagasApenasVoltar = 0;
  public userForaLimiteVai = 0;
  public userForaLimiteVolta = 0;
  public apenasVao = 0;
  public apenasVoltam = 0;
  public vaoEVoltam = 0;
  loading = false;
  constructor(
    public toastController: ToastController,
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
        this.limiteUsers = resposta.totalUsers
        this.totalUsers = this.data.length
        this.loading = false;
        console.log(this.data)
        this.data.forEach((vagas) => {
          if(vagas.vai == false && vagas.userForaLimite == false){
            this.vagasApenasIr++
          }
          if(vagas.vai == true && vagas.userForaLimite == true){
            this.userForaLimiteVai++
          }
          if(vagas.volta == false && vagas.userForaLimite == false){
            this.vagasApenasVoltar++
          }
          if(vagas.volta == true && vagas.userForaLimite == true){
            this.userForaLimiteVolta++
          }
          if(vagas.vai == true && vagas.volta == false){
            this.apenasVao++
          }
          if(vagas.volta == true && vagas.vai == false){
            this.apenasVoltam++
          }
          if(vagas.vai == true && vagas.volta == true){
            this.vaoEVoltam++
          }
          if((vagas.volta == true && vagas.vai == false && vagas.userForaLimite == true) || (vagas.volta == false && vagas.vai == true  && vagas.userForaLimite == true)){
            console.log(1)
          }
        })

    })
    
    
  }

  sairDetalheLista() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  novaHora() {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var date = new Date();
    return [date.getHours(), date.getMinutes()].map(pad).join(':');
  }
  dataAtual(){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    return dia + '/' + mes + '/' + ano;
  }

  entrarLista(acoes: any){
    var usuariosNaLista = this.data
    const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
    if(user){
      this.alerta("Você já está na lista lista.")
    }else{
      this.listaServices.getListaId(this.idLista).then((resposta: any)=>{
        this.inserirUsuarioNaLista(resposta.users, acoes)
      })
    }
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
      if(resposta === undefined){
        this.alerta("Você saiu da lista com sucesso!")
        this.sairDetalheLista();
      }
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
      situacao: true,
      userForaLimite: user.userForaLimite,
      confirmVolta: false,
      confirmIda: false,
      horaEntrouNalista: user.horaEntrouNalista
    })
    let data = {users: usuariosNaLista}
    this.listaServices.editarSituacao(data, this.idLista)
    .toPromise().then((resposta: any) => {
      if(resposta == undefined) {
        this.alerta("Seus dados foram atualizados com sucesso!")
        this.sairDetalheLista();
      }
    }).catch((err) => {
      console.log(err.message)
    })
  }

  confirmarIdaServe(acoes: any){
    var usuariosNaLista = this.data
    const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
    const index = usuariosNaLista.indexOf(user)
    console.log(user)


    if(acoes == 1){
      if(user.vai == false){
        this.alertaIrVoltar('Você não marcou a opção de "IR" anteriormente.')
      }else{
        if (index > -1) {
          usuariosNaLista.splice(index, 1);
        }
        usuariosNaLista.push({
          name: user.name,
          idPrincipal: user.idPrincipal,
          vai: user.vai,
          volta: user.volta,
          situacao: user.situacao,
          userForaLimite: user.userForaLimite,
          confirmVolta: user.confirmVolta,
          confirmIda: true,
          horaEntrouNalista: user.horaEntrouNalista
        })
      }
    }

    if(acoes == 2){
      if(user.volta == false){
        this.alertaIrVoltar('Você não marcou a opção de "VOLTAR" anteriormente.')
      }else{
        if (index > -1) {
          usuariosNaLista.splice(index, 1);
        }
        usuariosNaLista.push({
          name: user.name,
          idPrincipal: user.idPrincipal,
          vai: user.vai,
          volta: user.volta,
          situacao: user.situacao,
          userForaLimite: user.userForaLimite,
          confirmVolta: acoes == 2? user.confirmVolta == true? true : true : false,
          confirmIda: user.confirmIda,
          horaEntrouNalista: user.horaEntrouNalista
        })
      }
    }
    let data = {users: usuariosNaLista}
    this.listaServices.editarSituacao(data, this.idLista)
    .toPromise().then((resposta: any) => {
      if(acoes == 1){
        this.alerta("Você vonfirmou a sua IDA para Redenção com Sucesso!")
      }else if(acoes == 2){
        this.alerta("Você vonfirmou o seu RETORNO para pentecoste com Sucesso!")
      }
      this.sairDetalheLista();
    }).catch((err) => {
      console.log(err.message)
    })
  }

  async confirmacao(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  inserirUsuarioNaLista(users: any, acoes){
    const d = new Date();
    if(acoes == "IR"){
      users.push(
        {
          name: this.NameUser, 
          idPrincipal: this.idUser, 
          situacao: true, 
          vai: true,
          volta: false,
          userForaLimite: true,
          confirmVolta: false,
          confirmIda: false,
          horaEntrouNalista: this.novaHora()
        }
      );
    }else if(acoes == "VOLTAR"){
      users.push(
        {
          name: this.NameUser, 
          idPrincipal: this.idUser, 
          situacao: true, 
          vai: false,
          volta: true,
          userForaLimite: true,
          confirmVolta: false,
          confirmIda: false,
          horaEntrouNalista: this.novaHora()
        }
      );
    }else if(acoes != "IR" || acoes != "VOLTA"){
      users.push(
        {
          name: this.NameUser, 
          idPrincipal: this.idUser, 
          situacao: true, 
          vai: acoes[0] == 1? true : false,
          volta: acoes[1] == 2? true : acoes[0] == 2? true : false,
          userForaLimite: false,
          confirmVolta: false,
          confirmIda: false,
          horaEntrouNalista: this.novaHora()+" de "+this.dataAtual()
        }
      );
    }
    
    console.log(users)
    let data = {users: users}
    this.listaServices.entrarNaLista(data, this.idLista)
    .toPromise().then((resposta: any) => {
      this.alerta("Parabéns, você conseguiu sua vaga na lista!")
      this.sairDetalheLista();
    }).catch((err) => {
      console.log(err.message)
    })
  }

  async opcoes() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opções',
      buttons: [{
        text: 'Entrar na lista',
        role: 'destructive',
        handler: () => {

          if(this.vagasApenasIr != 0 && this.vagasApenasVoltar == 0 && (this.limiteUsers - this.vaoEVoltam - this.vagasApenasVoltar - this.vagasApenasIr) == 0){
            this.aletaDeVagas("Desculpe, temos vagas apenas para IR. Deseja entrar mesmo assim ?", "IR")
          }else if((this.vagasApenasVoltar - this.userForaLimiteVolta) != 0 && this.vagasApenasIr == 0 && (this.limiteUsers - this.vaoEVoltam - this.vagasApenasVoltar - this.vagasApenasIr) == 0){
            this.aletaDeVagas("Desculpe, temos vagas apenas para VOLTAR. Deseja entrar mesmo assim ?", "VOLTAR")
          }else if(this.vagasApenasIr == 0 && (this.vagasApenasVoltar - this.userForaLimiteVolta) == 0 && (this.limiteUsers - this.vaoEVoltam - this.vagasApenasVoltar - this.vagasApenasIr) == 0){
            this.alerta('Desculpe. A lista já atingiu o limite de '+this.limiteUsers+' pessoa(s).');
          }else{
            this.entrarNaLista();
          }
        }
      }, 
      {
        text: 'Editar situação',
        handler: () => {
          var usuariosNaLista = this.data
          const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
          if(!user){
            this.alerta('Você ainda não entrou na lista.');
          }else{
            this.editarSituacao()
          }
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          var usuariosNaLista = this.data
          const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
          if(!user){
            this.alerta('Você ainda não entrou na lista.');
          }else{
            this.confirmacaoDaViagem()
          }
        }
      },
      {
        text: 'Excluir lista(Admin)',
        handler: () => {
          if(this.perfil == 'admin'){
            this.alertaExclusao("Quer realmente excluir a lista ?");
          }else{
            this.alerta('Desculpe. Apenas administradores podem realizar essa ação.');
          }
        }
      }, 
      {
        text: 'Sair da lista',
        handler: () => {
          var usuariosNaLista = this.data
          const user = usuariosNaLista.find(usuario => usuario.idPrincipal === this.idUser)
          if(!user){
            this.alerta('Você ainda não entrou na lista.');
          }else{
            this.confirmacaoSairLista();
          }
          
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
  async alertaIrVoltar(mensagem: string){
    const alerta = await this.alertController.create({
      header: mensagem,
      cssClass: 'alertDanger',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () =>{
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
          }
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

  async alertaExclusao(mensagem: string){
    const alerta = await this.alertController.create({
      header: mensagem,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'my-custom-class',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluirLista()
          }
        }
      ]
    });
    await alerta.present();
  }

  async aletaDeVagas(mensagem: string, tipoVaga: string){
    const alerta = await this.alertController.create({
      header: mensagem,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'my-custom-class',
          handler: () => {
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.entrarLista(tipoVaga)
          }
        }
      ]
    });
    await alerta.present();
  }

  async confirmacaoDaViagem() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Selecione uma opção:',
      inputs: [
        {
          name: 'confirmarIr',
          type: 'radio',
          label: 'Confirmar Ida',
          value: 1
        },
        {
          name: 'confirmarVolta',
          type: 'radio',
          label: 'Confirmar Volta',
          value: 2
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
          handler: (data) => {
            this.confirmarIdaServe(data)
          }
        }
      ]
    });

    await alert.present();
  }


  excluirLista(){
    this.listaServices.delListaId(this.idLista, this.tokenUser)
        .toPromise().then((resposta: any) => {
          if(resposta == null){
            this.alerta('Lista excluida com sucesso!');
            this.sairDetalheLista()
            this.router.navigate(['', 'dashboard'])
          }
        }).catch((err) => {
          console.log(err.message)
        })
  }



}
