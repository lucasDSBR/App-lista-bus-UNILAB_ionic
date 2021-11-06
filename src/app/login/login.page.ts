import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from '../../Model/Login.model';
import { LoginService } from '../../Service/Login.service';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginService]
})
export class LoginPage {

  slideOpts = {
    initialSlide: 0
  }
  

  loading = false;
  
  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required])
  });
  constructor(
    public alertController: AlertController,
    private loginService: LoginService,
  ) {}


  confirmarCadastro(): void{
    if(this.formLogin.status === "INVALID"){
      this.formLogin.get('email').markAsTouched()
      this.formLogin.get('password').markAsTouched()
      this.presentAlert("Você esqueceu de preencher algum campo...")
    }else{
      let dataUser: Login = new Login(
        this.formLogin.value.email, 
        this.formLogin.value.password
      )
      this.loading = true;

      this.loginService.login(dataUser)
        .toPromise().then((resposta: any) => {
          this.loading = false 
        }).catch((err) => {
          this.loading = false  
          this.presentAlert("Dados incorretos...")
      })
    }
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
