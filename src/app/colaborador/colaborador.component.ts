import { Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  Colaborador from '../models/Colaborador'
import Experiencias from '../models/Experiencias';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit, OnDestroy {

  constructor( private route: ActivatedRoute) { }

  consultMode = true;
  private showExp = true;
  private ListExperiencias = [];
  private mode = '';
  private Colaborador;
  private destroySensors$: Subject<void> = new Subject<void>();
  modeInscription: Subscription;




  ngOnInit() {

    this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    })

  }

  ngOnDestroy(){
    this.modeInscription.unsubscribe();
  }

  addExperiencia(){
    this.ListExperiencias.push(new Experiencias());
    this.showExp = !this.showExp;
  }

  saveDataExperiencia(expIndice){{

  }

  }


  private changeMode(){
    if(this.mode === 'create'){
      this.consultMode = false;
    }
    else{
      this.consultMode = true;

    }
  }

}
