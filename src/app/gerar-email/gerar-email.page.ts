import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../Service/Lista.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';
import { File as Native_File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { format } from 'util';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-gerar-email',
  templateUrl: './gerar-email.page.html',
  styleUrls: ['./gerar-email.page.scss'],
  providers:[ListaService]
})
export class GerarEmailPage implements OnInit {
  loading = true;
  data = [];
  usersLista = [];
  listasParaEnvio = []
  arquivos = [];
  localDisc = [];
  constructor(
    public loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    private file: Native_File,
    private router: Router,
    public alertController: AlertController,
    private emailComposer: EmailComposer,
    private listaServices: ListaService
  ) { }

  ngOnInit() {
    this.listaServices.getLista().then((resposta: any) => {
      this.loading = false;
      this.data = resposta.items
    }).catch((err) => {

    })
  }

  macarLista(event, id: string){
    console.log(id)
    if(event.target.checked == false){
      const idlists = this.listasParaEnvio.find(idlist => idlist === id)
      if(idlists){
        console.log("já está na lista")
      }else{
        this.listasParaEnvio.push(id)
      }
    }
    if(event.target.checked == true){
      const idlists = this.listasParaEnvio.find(idlist => idlist === id)
      const index = this.listasParaEnvio.indexOf(idlists)
      if (index > -1) {
        this.listasParaEnvio.splice(index, 1);
      }
    }

    console.log(this.listasParaEnvio)
  }
  gerarCSV(){
    console.log(this.listasParaEnvio[0])
    for(var i = 0; i < this.listasParaEnvio.length; i++){
      const lista = this.data.find(data => data._id === this.listasParaEnvio[i])
      if(lista.users.length > 0){
        var csv = 'Id Lista, Nome da Lista, Aluno(a), Foi para Redencao, Voltou para Pentecoste, Data Ida(Lista), Data Volta(Lista)\n';
 
          lista.users.forEach(function(row) {
                  csv += lista._id;
                  csv += ','+ lista.name;
                  csv += ','+ row.name;
                  csv += ','+ row.vai;
                  csv += ','+ row.volta;
                  csv += ','+ lista.dataIda;
                  csv += ','+ lista.dataVolta;
                  csv += '\n';
          });
        console.log(lista.users)
        this.file.writeFile(this.file.externalRootDirectory, `${lista.name}.csv`, csv, {replace: true})
        .then((ok) => {
          this.localDisc.push(`${this.file.externalRootDirectory}${lista.name}.csv`)
        })
        .catch((err) => {
          console.error("Deu erro: "+err);
        })
      };
    }
  }

  getPermission() {
    if(this.listasParaEnvio.length == 0){
      this.alert("É necessário informar pelo menos uma lista para enviar.")
    }else{
      this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.gerarCSV();
          this.alertEmailDestino();
        } 
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if(status.hasPermission) {
                this.alertEmailDestino();
              }
            });
        }
      });
    }
    
  }

  async alertEmailDestino(){
    const editSituacao = await this.alertController.create({
      header: 'Informe o E-mail que receberá os dados',
      inputs:[
        {
          name: 'email',
          type: 'text',
          placeholder: 'Digite o E-mail'
        },
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
            if(data.email == ''){
              this.alert("Você precisa informar um E-mail de destino.")
            }else{
              this.carregando(data.email)
            }
          }
        }
      ]
    });
    await editSituacao.present();
  }

  async carregando(data: string) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Gerando listas...',
      duration: 2000
    });
    await loading.present();
    this.enviar(data);
    
  }

  enviar(emailDestino: string){
    let email = {
      to: emailDestino,
      attachments: this.localDisc,

      subject: 'LISTAS DE FREQUÊNCIA DOS UNIVERSITÁRIOS UNILAB',
      body: 'Obs: Nas colunas ',
      isHtml: true
    };
    this.emailComposer.open(email)
    this.localDisc = []
  }



  async alert(msg: string){
    const editSituacao = await this.alertController.create({
      header: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'my-custom-class',
          handler: () => {
          }
        }
      ]
    });
    await editSituacao.present();
  }

}
