import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../Service/Usuario.service';
import { User } from '../../Model/User.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.page.html',
  styleUrls: ['./register-users.page.scss'],
  providers: [UsuarioService]
})
export class RegisterUsersPage{
  tokenUser = localStorage.getItem('isAutenticado');


  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required]),
    'instituicao': new FormControl(null, [Validators.required]),
    'curso': new FormControl(null, [Validators.required]),
    'genero': new FormControl(null, [Validators.required]),
    'cidade': new FormControl(null, [Validators.required]),
    'situacao': new FormControl(null, [Validators.required]),
    'profiles': new FormControl(null, [Validators.required]),
  });
  constructor(
    private router: Router,
    public alertController: AlertController,
    private usuarioService: UsuarioService
  ) { }

  confirmarCadastro(): void{
    if(this.formulario.status === "INVALID"){
      this.formulario.get('name').markAsTouched()
      this.formulario.get('email').markAsTouched()
      this.formulario.get('password').markAsTouched()
      this.formulario.get('instituicao').markAsTouched()
      this.formulario.get('curso').markAsTouched()
      this.formulario.get('genero').markAsTouched()
      this.formulario.get('cidade').markAsTouched()
      this.formulario.get('situacao').markAsTouched()
      this.formulario.get('profiles').markAsTouched()
    }else{
      let dataUser = new User(
        this.formulario.value.name,
        this.formulario.value.email,
        this.formulario.value.password,
        this.formulario.value.instituicao,
        this.formulario.value.curso,
        this.formulario.value.genero,
        this.formulario.value.cidade,
        this.formulario.value.situacao,
        this.formulario.value.profiles
      )
      this.usuarioService.cadatroUsuario(dataUser, this.tokenUser)
      .toPromise().then((resposta: any) => {
        this.alerta("Cadastro realizado com sucesso!", 'Usuário cadastrado com sucesso!... Você será encaminhado para a aba de usuários agora.')
      }).catch((err) => {
        this.alerta("Erro", "Ops.... algo não ocorreu como esperado. tente novamente mais tarde.  Você será encaminhado para a aba de usuários agora.")
      })
    }
  }


  async alerta(msg1: string, msg2: string){
    const alerta = await this.alertController.create({
      header: msg1,
      message: msg2,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/users'])
          }
        }
      ]
    });
    await alerta.present();
  }

}
