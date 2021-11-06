import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/Login.service';
import { ListaService } from '../../Service/Lista.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [LoginService, ListaService]
})
export class DashboardPage implements OnInit {
  perfil = localStorage.getItem('perfil');
  constructor(
    private loginService: LoginService,
    private listaServices: ListaService
  ) { }

  ngOnInit() {
  }


  sair(){
    this.loginService.sair();
  }

}
