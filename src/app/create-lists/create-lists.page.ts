import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lista } from '../../Model/Lista.model';
import { ListaService } from '../../Service/Lista.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/Login.service';
@Component({
  selector: 'app-create-lists',
  templateUrl: './create-lists.page.html',
  styleUrls: ['./create-lists.page.scss'],
  providers: [ListaService, LoginService]
})
export class CreateListsPage implements OnInit {

  perfil = localStorage.getItem('perfil');
  tokenUser = localStorage.getItem('isAutenticado');
  customPickerOptionsIda: any;
  dataIda: any;
  customPickerOptionsVolta: any;
  dataVolta: any;
  totalDePessoas: number;
  constructor(
    private loginService: LoginService,
    private router: Router,
    public alertController: AlertController,
    private listaService: ListaService
  ) {
    this.customPickerOptionsIda = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
        text: 'Confirmar',
        handler: (data) => {
          this.dataIda = data
          console.log(data)
        }
      }]
    };
    this.customPickerOptionsVolta = {
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
        text: 'Confirmar',
        handler: (data) => {
          this.dataVolta = data
        }
      }]
    };
    
   }

  ngOnInit() {
  }

  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'dataIda': new FormControl(null, [Validators.required]),
    'dataVolta': new FormControl(null, [Validators.required]),
    'totalUsers': new FormControl(null, [Validators.required]),
  });

  confirmarCadastro(): void{
    if(this.formulario.status === "INVALID"){
      this.formulario.get('name').markAsTouched()
      this.formulario.get('dataIda').markAsTouched()
      this.formulario.get('dataVolta').markAsTouched()
      this.formulario.get('totalUsers').markAsTouched()
      this.presentAlert("Todos os campos s??o obrigat??rios!")
    }else{
      let dataList = new Lista(
        this.formulario.value.name,
        `${this.dataIda.day.text}/${this.dataIda.month.text}/${this.dataIda.year.text}`,
        `${this.dataVolta.day.text}/${this.dataVolta.month.text}/${this.dataVolta.year.text}`,
        [],
        this.formulario.value.totalUsers,
        true
      )
      console.log(dataList)
      this.listaService.createList(dataList, this.tokenUser)
      .toPromise().then((resposta: any) => {
        if(resposta){
          this.alerta(resposta.name, "Criada com sucesso!")
          this.formulario.reset();
        }
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

  async alerta(msg1: string, msg2: string){
    const alerta = await this.alertController.create({
      header: msg1,
      subHeader: msg2,
      message: 'Lembre-se: Sempre que voc?? quiser criar uma lista, ter?? que apagar a feita anteriormente.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    
    await alerta.present();
    this.router.navigate(['/dashboard'])
  }
 
  sair(){
    this.loginService.sair();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
