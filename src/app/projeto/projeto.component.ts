import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjetoService } from './../services/projeto-service';
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
  private destroyProjects$: Subject<void> = new Subject<void>();
  projectList:any;
  filtersProjects = [];
  modeInscription: Subscription;
  projectSelected:any;

  // -- Forms
  projectForm: FormGroup;
  submitted = false;


  constructor(private projetoService: ProjetoService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.fillForm();

   this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    })
    console.log('PROJETO COMPONENT -ON INIT');
    let projeto = new Projeto();
    projeto.codigo = '1';
    if(this.consultMode){
      this.doListProjects();
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

  async doGetProjets(projeto: Projeto){

    this.projetoService.get(projeto).pipe(takeUntil(this.destroyProjects$)).subscribe(
        projectList => {
          debugger;
          console.log(projectList);
          return this.projectList = projectList
        },
    );
}

async doListProjects(){

this.projetoService.list().pipe(takeUntil(this.destroyProjects$)).subscribe(
  projectList => {
    debugger;
    console.log(projectList);
    return this.projectList = projectList
  },);

}

fillForm(){
  this.projectForm = this.formBuilder.group({
    id:  '',
    descricao : '',
    habilidades : '',
    tempos : ''
  })
}

onSubmit(){
  this.submitted = true;
  console.log(this.projectForm.value);
  if(this.projectForm.valid){
    this.doSaveProject();
  }
}

onCancel(){
  this.submitted = false;
  this.projectForm.reset();
}

hasError(field){
  return this.projectForm.get(field).errors;
}

formToDTO(): Projeto{
  let projeto = new Projeto();
  projeto.descricao = this.projectForm.value['descricao'];
  projeto.habilidades = this.projectForm.value['habilidades'];
  projeto.tempos = this.projectForm.value['tempos'];
  return projeto;
}

async doSaveProject(){
  this.projetoService.save(this.formToDTO()).pipe(takeUntil(this.destroyProjects$)).subscribe(
    projectList => {
      debugger;
      console.log(projectList);
      return this.projectList = projectList
    },);
//  this.projetoService.save(this.formToDTO());
}



}

