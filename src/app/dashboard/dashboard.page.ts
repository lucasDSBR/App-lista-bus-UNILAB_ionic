import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Service/Login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [LoginService]
})
export class DashboardPage implements OnInit {
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  sair(){
    this.loginService.sair();
  }

}
