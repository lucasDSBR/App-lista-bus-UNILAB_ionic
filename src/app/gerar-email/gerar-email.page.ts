import { Component, OnInit } from '@angular/core';
import { ListaService } from '../../Service/Lista.service';

@Component({
  selector: 'app-gerar-email',
  templateUrl: './gerar-email.page.html',
  styleUrls: ['./gerar-email.page.scss'],
  providers:[ListaService]
})
export class GerarEmailPage implements OnInit {
  loading = true;
  data = [];
  listasParaEnvio = []

  constructor(
    private listaServices: ListaService
  ) { }

  ngOnInit() {
    this.listaServices.getLista().then((resposta: any) => {
      this.loading = false;
      this.data = resposta.items
      console.log(resposta)
    }).catch((err) => {

    })
  }

  macarLista(event, id: string){
    if(event.target.checked == false){
      this.listasParaEnvio.push(id)
      console.log(this.listasParaEnvio)
    }
    if(event.target.checked == true){
      const user = this.listasParaEnvio.find(id => id === id)
      const index = this.listasParaEnvio.indexOf(user)
    if (index > -1) {
      this.listasParaEnvio.splice(index, 1);
    }
    console.log(this.listasParaEnvio)
    }
  }

  enviar(){
    console.log(this.listasParaEnvio)
  }

  

}
