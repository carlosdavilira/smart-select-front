import { ExperienceService } from './../services/experiencia-service';
import { ProjetoService } from './../services/projeto-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Util from '../utils/util';
import { ColaboradorService } from '../services/colaborador-service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit, OnDestroy {

  results = false;
  constructor(private projetoService: ProjetoService,
    private formBuilder: FormBuilder,
    private workerService: ColaboradorService,
    private experienceService: ExperienceService) { }


  projectForm: FormGroup;
  workerExperience:FormGroup;
  private destroyProjects$: Subject<void> = new Subject<void>();
  private destroyWorker$: Subject<void> = new Subject<void>();
  private destroyExperience$: Subject<void> = new Subject<void>();


  projectList:any = [];
  workerList:any = [];
  experienceList:any = [];
  workersRankedByProject = []

  hasResults = false;

  requestStatus = null;
  requestMessage = '';
  projectSelected = {descricao: 'Selecione um projecto'};


  ngOnInit() {
    this.fillForm();
    this.doListProjects();
    this.doListWorkers();
    this.fillFormWorkerExperiencice();
  }

  showResults(){
    debugger;
    this.results = true;
    let workersCompatible = [];
    let project = this.projectSelected;
    let workers = this.experienceList;
    this.experienceList.forEach(exp => {
        let hab = exp.codigoColaborador['habilidades'].split(',');
        let haNec = project['habilidades'].split(',');
        let points = this.CheckAvaliableHab(hab, haNec);
        if(points > 0){
          workersCompatible.push({colaborador: exp.codigoColaborador, projectCompatible:project, point: points});
        }
    });
     this.workersRankedByProject = this.rankWorkers(workersCompatible);

  }

  rankWorkers(workersCompatible){
    let listReturn = [];
    let listRanked =  workersCompatible.sort((a,b) =>{
      if(a['point'] < b['point'] ){
      return -1;
    }
      if(a['point'] > b['point']){
      return 1
    }
    return 0;
    });
    for(let i = listRanked.length - 1; i >= 0; i-- ){
      listReturn.push(listRanked[i]);
    }
    return listReturn;
  }

  private CheckAvaliableHab(workHab, habProject){
    let points = 0;
    habProject.forEach(workerHab => {
      workHab.forEach(habNec => {
        if(workerHab.toLowerCase().trim("") === habNec.toLowerCase().trim("")){
          points++;
        }
      });
    });
    return points;
  }

  ngOnDestroy(): void {

    this.destroyProjects$.unsubscribe();
    this.destroyWorker$.unsubscribe();
    this.destroyExperience$.unsubscribe();
  }

  async doListProjects(){
    this.projetoService.list().pipe(takeUntil(this.destroyProjects$)).subscribe(
      projectList => {
        debugger;
        this.hasResults = true;
        this.getMessagens();
        return this.projectList = projectList
      },);

    }

    async doListWorkers(){
      this.workerService.list().pipe(takeUntil(this.destroyWorker$)).subscribe(
        workerList => {
          debugger;
          this.hasResults = true;
          console.log('------------ WORKER LIST --------------');
            console.log(workerList);
          workerList.forEach(worker =>{
            this.doListExperience(worker);
          }
            );
          this.getMessagens();
          return this.workerList = workerList
        },);
      }

      async doListExperience(worker){
        this.experienceService.list(worker).pipe(takeUntil(this.destroyExperience$)).subscribe(
          experienceList => {
            debugger;
            this.hasResults = true;
            this.getMessagens();
            console.log('------------ EXPERIENCE LIST --------------');
            console.log(experienceList);
            let test = this.experienceList.concat(experienceList);
            return this.experienceList = this.experienceList.concat(experienceList);
          },);
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

    fillForm(){
      this.projectForm = this.formBuilder.group({
        id:  '',
        descricao : '',
        habilidades : '',
        tempos : ''
      });
    }

    fillFormWorkerExperiencice(){
      this.workerExperience = this.formBuilder.group({
        idColaborador:  '',
        nome: '',
        descricao : '',
        habilidades : '',
        tempos : '',
        projetoAtual: '',
        nomeProjeto: '',
        habilidadesNecessaria: '',
        tempoMedio: '',
        nomeGerente: ''
      });
    }

    onSelectProject(project){
      this.projectSelected = project;
    }

    ViewWorkerByProject(worker){
      this.workerExperience.get('nome').setValue(worker.colaborador.nome);
      this.workerExperience.get('projetoAtual').setValue(worker.colaborador.projetoAtual);
      this.workerExperience.get('nomeGerente').setValue(worker.colaborador.gerenteAtual);
      this.workerExperience.get('habilidades').setValue(worker.colaborador.habilidades);
      this.workerExperience.get('nomeProjeto').setValue(worker.projectCompatible.descricao);
      this.workerExperience.get('habilidadesNecessaria').setValue(worker.projectCompatible.habilidades);
      this.workerExperience.get('tempoMedio').setValue(worker.projectCompatible.tempos);




    }
  }
