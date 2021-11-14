import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../Service/Lista.service';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';
import { File as Native_File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { format } from 'util';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-gerar-email',
  templateUrl: './gerar-email.page.html',
  styleUrls: ['./gerar-email.page.scss'],
  providers:[ListaService]
})
export class GerarEmailPage {
  
  loading = true;
  data = [];
  usersLista = [];
  listasParaEnvio = []
  arquivos = [];
  localDisc = [];
  constructor(
    private socialSharing: SocialSharing,
    public loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    private file: Native_File,
    private router: Router,
    public alertController: AlertController,
    //private emailComposer: EmailComposer,
    private listaServices: ListaService
  ) { }

  ionViewWillEnter() {
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

  }
  gerarCSV(){
    console.log(this.listasParaEnvio[0])
    for(var i = 0; i < this.listasParaEnvio.length; i++){
      const lista = this.data.find(data => data._id === this.listasParaEnvio[i])
      if(lista.users.length > 0){
        var csv = 'Id Lista, Nome da Lista, Aluno(a), Foi para Redenção, Voltou para Pentecoste, Data Ida(Lista), Data Volta(Lista)\n';
 
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
        console.log(csv)
        this.file.writeFile(this.file.dataDirectory, `${lista.name}.csv`, csv, {replace: true})
        .then((ok) => {
          this.localDisc.push(`${this.file.dataDirectory}${lista.name}.csv`)
        })
        .catch((err) => {
          console.error("Deu erro: "+err);
        })
      };
    }
    this.alertEmailDestino()
  }

  gerarXLSX(){
    this.exportAsExcelFile(this.data);
  }

  gerarPDF(){
    this.exportAsPdfFile(this.data);
  }
  public exportAsPdfFile(json: any[]): void {
    if(this.listasParaEnvio.length >= 1){
      this.listasParaEnvio.forEach(idLista => {
        const idlists = this.data.find(idlist => idlist._id === idLista)
        console.log(idlists.users)
        var doc = new jsPDF('l', 'pt');
        var rows = [];
        const head = [[' -- ','Usuario', 'Foi p/Redenção', 'Voltou p/Pentecoste', 'Situacao SIGAA', 'Usuario Fora das Vagas']]
        for(var key in idlists.users){
            var temp = [
              key,
              idlists.users[key].name,
              idlists.users[key].confirmIda == false? "NÃO": "SIM",
              idlists.users[key].confirmVolta == false? "NÃO": "SIM",
              idlists.users[key].situacao == false? "INATIVO(A)": "AIVO(A)",
              idlists.users[key].userForaLimite == false? "NÃO": "SIM"
            ];
            rows.push(temp)
        }
        doc.text("Docente: ", 10, 30)
        autoTable(doc, {
          head: head,
          body: rows,
          didDrawCell: (data) => { },
        });
        let docRes = doc.output();
        let buffer = new ArrayBuffer(docRes.length);
        //const data: Blob = new Blob([doc.output('blob')], {type: 'application/pdf'});
        this.file.writeFile(this.file.dataDirectory, `${idlists.name}_export_${new  Date().getTime()}.pdf`, buffer, {replace: true})
        .then((ok) => {
            this.localDisc.push(`${this.file.dataDirectory}${idlists.name}_export_${new  Date().getTime()}.pdf`)
            
        })
        .catch((err) => {
            console.error("Deu erro: "+err);
        })
      })
    }

    this.alertEmailDestino()

}
  public exportAsExcelFile(json: any[]): void {
      if(this.listasParaEnvio.length >= 1){
        this.listasParaEnvio.forEach(idLista => {
          const idlists = this.data.find(idlist => idlist._id === idLista)
          const users = idlists.users
          var Heading =[
            [ "Hora Entrou","Confirmou p/Redenção","Confirmou p/Pentecoste", "Vaga de reseva", "Volta p/Pentecoste", "Vai p/Redenção", "Situação SIGAA", "Identificador Aluno", "Aluno", "Identificador lista"]  
          ];
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(users);
          
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          XLSX.utils.sheet_add_aoa(worksheet, Heading);
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, idlists.name);
        })
      }

      this.alertEmailDestino()

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
      //const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      //FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
      this.file.writeFile(this.file.dataDirectory, `${fileName}_export_${new  Date().getTime()}.xlsx`, buffer, {replace: true})
      .then((ok) => {
          this.localDisc.push(`${this.file.dataDirectory}${fileName}_export_${new  Date().getTime()}.xlsx`)
          
      })
      .catch((err) => {
          console.error("Deu erro: "+err);
      })
  }


  getPermission() {
    if(this.listasParaEnvio.length == 0){
      this.alert("É necessário informar pelo menos uma lista para enviar.")
    }else{
      this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.formatoArquivo()
        } 
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if(status.hasPermission) {
                this.formatoArquivo()
              }
            });
        }
      });
    }
    
  }

  async formatoArquivo(){
    const editSituacao = await this.alertController.create({
      header: 'Em que formato deseja enviar as listas:',
      inputs:[
        {
          name: 'xlsx',
          type: 'radio',
          label: 'XLSX(EXCEL)',
          value: 1
        },
        {
          name: 'pdf',
          type: 'radio',
          label: 'PDF',
          value: 2
        },
        {
          name: 'csv',
          type: 'radio',
          label: 'CSV',
          value: 3
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
          text: 'Ok',
          handler: (data) => {
            if(data === 1){
              this.gerarXLSX()
            }else if(data === 2){
              this.gerarPDF()
            }else{
              this.gerarCSV()
            }
          }
        }
      ]
    });
    await editSituacao.present();
  }

  async alertEmailDestino(){
    const editSituacao = await this.alertController.create({
      header: 'Informe o E-mail que deseja enviar os dados:',
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
              this.enviar(data.email)
            }
          }
        }
      ]
    });
    await editSituacao.present();
  }

  async carregando() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Gerando listas...',
      duration: 5000
    });
    await loading.present();
    setTimeout(a => {
      this.alertEmailDestino();
    },5000);
  }
  
  enviar(email){
    this.socialSharing.shareViaEmail(
      '<table><tr><th>Company</th><th>Contact</th><th>Country</th></tr>', 
      'Titulo', 
      [email], 
      [], 
      [], 
      this.localDisc
      ).then(() => {

      this.localDisc = []

    }).catch(() => {

      this.localDisc = []

    });
  }

  // enviar(emailDestino: string){
  //   console.log(this.localDisc)
  //   let email = {
  //     to: emailDestino,
  //     attachments: this.localDisc,

  //     subject: 'LISTAS DE FREQUÊNCIA DOS UNIVERSITÁRIOS UNILAB',
  //     body: 'Obs: Nas colunas ',
  //     isHtml: true
  //   };
  //   this.emailComposer.open(email)
  //   this.localDisc = []
  // }



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
