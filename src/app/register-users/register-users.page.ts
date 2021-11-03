import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../Service/Usuario.service';
import { User } from '../../Model/User.model';
@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.page.html',
  styleUrls: ['./register-users.page.scss'],
  providers: [UsuarioService]
})
export class RegisterUsersPage{

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
      this.usuarioService.cadatroUsuario(dataUser)
      .toPromise().then((resposta: any) => {
        console.log(resposta)
      }).catch((err) => {
        console.log(err.message)
      })
    }
  }

}
