import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-lists',
  templateUrl: './create-lists.page.html',
  styleUrls: ['./create-lists.page.scss'],
})
export class CreateListsPage implements OnInit {
  customPickerOptionsIda: any;
  dataIda: any;
  customPickerOptionsVolta: any;
  dataVolta: any;
  totalDePessoas: number;
  constructor() {
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
    }
   }

  ngOnInit() {
  }

  
 
}
