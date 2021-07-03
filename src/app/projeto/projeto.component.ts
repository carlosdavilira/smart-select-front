import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjetoService } from './../services/projeto-service';
import Projeto from '../models/Projeto';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Util from '../utils/util';


@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit, OnDestroy {

  consultMode = true;
  private mode = '';
  private destroyProjects$: Subject<void> = new Subject<void>();
  projectList:any = [];
  projectsFiltered = [];
  filterProject = '';
  modeInscription: Subscription;
  projectSelected:any;
  hasResults = false;

  requestStatus = null;
  requestMessage = '';


  // -- Forms
  projectForm: FormGroup;
  editProjectForm: FormGroup;
  submitted = false;



  constructor(private projetoService: ProjetoService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.fillForm();

   this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    });
    // Find all projects when compononent initialize
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

    this.fillForm();
    // When mode changes and it be edit Find all projects when compononent initialize
    if(this.consultMode){
      this.doListProjects();
    }
  }

  async doGetProjets(projeto: Projeto){

    this.projetoService.get(projeto).pipe(takeUntil(this.destroyProjects$)).subscribe(
        projectList => {
          debugger;
          //this.fillForm();
          console.log(projectList);
          return this.projectList = projectList
        },
    );
}

async doListProjects(){

this.projetoService.list().pipe(takeUntil(this.destroyProjects$)).subscribe(
  projectList => {
    this.hasResults = true;
    this.getMessagens();
    return this.projectList = projectList
  },);

}

fillForm(){
  this.projectForm = this.formBuilder.group({
    id:  '',
    descricao : '',
    habilidades : '',
    tempos : ''
  });

  this.editProjectForm = this.formBuilder.group({
    id:  '',
    descricao : '',
    habilidades : '',
    tempos : ''
  });
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
    project => {
      debugger;
      console.log(project);
      this.validRequestMessage(project);
      this.onCancel();
     // return this.projectList = projectList
    },);
//  this.projetoService.save(this.formToDTO());
}

filterProjects(){

  if(this.projectList.length === 0 || this.filterProject === undefined || this.filterProject.trim() === ''){
      return this.projectList;
  }
  let filterLower = this.filterProject.toLowerCase();
    return this.projectList.filter(
    element => {
      if (element['descricao'].toLowerCase().indexOf(filterLower) >= 0){
        return true;
      }
      return false;
    }
  );
}

getMessagens(){
  debugger;
  if(this.hasResults){
    this.requestMessage = Util.successMessage();
  }
  else if(!this.hasResults){
    this.requestMessage = Util.errorNotFound();
  }
}

viewProject(project){
  this.editProjectForm = this.formBuilder.group({
    id:  project['codigo'],
    descricao : project['descricao'],
    habilidades : project['habilidades'],
    tempos : project['tempos']
  });

}

deleteProject(project){

}

onCloseModal(){
  //this.fillForm();
}

validRequestMessage(requestResult){
  debugger
  if(requestResult){
    this.requestMessage = Util.successSaveMessage();
  }
  else{
    this.requestMessage = Util.errorSaveMessage();
  }
  this.requestStatus = true;
  console.log(this.requestMessage);

}



}

