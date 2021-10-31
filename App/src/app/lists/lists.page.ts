import { Component, OnInit,ViewChild } from '@angular/core';
import { ListaService } from '../../Service/Lista.service';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  providers:[ListaService]
})
export class ListsPage implements OnInit {
  data = []
  constructor(
    private listaServices: ListaService
  ) { }

  ngOnInit() {
    this.listaServices.getLista().then((resposta: any) => {
      this.data = resposta.items
      console.log(this.data)
    })
  }

  
}
