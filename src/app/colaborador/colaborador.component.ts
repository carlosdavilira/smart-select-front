import { Component, OnInit } from '@angular/core';
import  Colaborador from '../models/Colaborador'
import Experiencias from '../models/Experiencias';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  constructor() { }

  private showExp = false;
  private ListExperiencias = [];
  private Colaborador;


  ngOnInit() {
  }

  addExperiencia(){
    this.ListExperiencias.push(new Experiencias());
    this.showExp = !this.showExp;
  }

  saveDataExperiencia(expIndice){{

  }

  }

}
