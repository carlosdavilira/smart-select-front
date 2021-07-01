import { ProjetoService } from './../services/projeto-service';
import { Component, OnInit } from '@angular/core';
import Projeto from '../models/Projeto';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  consultMode = true;
  private destroySensors$: Subject<void> = new Subject<void>();
  projectList:any;

  constructor(private projetoService: ProjetoService) { }

  ngOnInit() {
    console.log('PROJETO COMPONENT -ON INIT');
    let projeto = new Projeto();
    projeto.id = '1';
    this.doGetProjetos(projeto);

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
