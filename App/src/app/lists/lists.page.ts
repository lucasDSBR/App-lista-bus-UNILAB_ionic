import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
})
export class ListsPage implements OnInit {

  constructor() { }
  data = [
    {
      name: "lista 1",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 2",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    },
    {
      name: "lista 3",
      dataIda: "31/03/2021",
      dataVolta: "03/04/2021"
    }
  ]
  ngOnInit() {
  }

}
