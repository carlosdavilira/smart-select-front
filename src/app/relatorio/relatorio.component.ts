import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  results = false;
  constructor() { }

  ngOnInit() {
  }

  showResults(){
    this.results = true;
  }

}
