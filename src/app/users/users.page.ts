import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../Service/Usuario.service';
import { User } from '../../Model/User.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [UsuarioService]
})
export class UsersPage implements OnInit {
  data = []
  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().then((resposta: any) => {
      this.data = resposta.items
      console.log(this.data)
    })
  }

}
