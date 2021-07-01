import { ProjetoService } from './../services/projeto-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Projeto from '../models/Projeto';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit, OnDestroy {

  consultMode = true;
  private mode = '';
  private destroySensors$: Subject<void> = new Subject<void>();
  projectList:any;
  modeInscription: Subscription;

  constructor(private projetoService: ProjetoService,
              private route: ActivatedRoute) { }

  ngOnInit() {
   this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    })
    console.log('PROJETO COMPONENT -ON INIT');
    let projeto = new Projeto();
    projeto.id = '1';
    if(this.consultMode){
      this.doGetProjetos(projeto);
    }



  }

  ngOnDestroy(){
    this.modeInscription.unsubscribe();
  }

  private changeMode(){
    if(this.mode === 'create'){
      this.consultMode = false;
    }
    else{
      this.consultMode = true;

    }
  }

  async doGetProjetos(projeto: Projeto){

    this.projetoService.get(projeto).pipe(takeUntil(this.destroySensors$)).subscribe(
        projectList => {
          debugger;
          console.log(projectList);
          return this.projectList = projectList
        },
    );

}


}
