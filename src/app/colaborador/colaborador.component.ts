import { UsuarioBackEnd } from './../services/usuario-backend';
import { Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  Colaborador from '../models/Colaborador'
import Experiencias from '../models/Experiencias';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColaboradorService } from '../services/colaborador-service';
import { TypeMessage } from '../models/TypeMessage';
import Util from '../utils/util';
import { ExperienceService } from '../services/experiencia-service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit, OnDestroy {

  constructor(
    private workerService: ColaboradorService,
    private experienceService: ExperienceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioBackEnd) { }

  consultMode = true;
  private showExp = true;
  private ListExperiencias = [];
  private mode = '';
  filterWorker = '';
  private Colaborador;
  currentUser = null;
  modeInscription: Subscription;

    // -- Forms
    workerForm: FormGroup;
    viewWorkerForm: FormGroup;
    experienciesForm:FormGroup[] = [];
    editWorkerForm:FormGroup;

    private destroyWorker$: Subject<void> = new Subject<void>();
    private destroyExperience$: Subject<void>[] = [];
    destroyGetExperience$: Subject<void> = new Subject<void>();
    destroyUserData$: Subject<void> = new Subject<void>();

    requestMessage = '';
    submitted = false;
    requestStatus = null;
    hasResults = false;
    lastIndexExperience = 0;
    workerList:any = [];
    experienceListView = [];

  ngOnInit() {

    this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    })
    this.fillForm();
    this.fillFormExperiencias(this.lastIndexExperience);
    if(this.consultMode){
      this.doListWorkers();
    }
    debugger;
    this.currentUser = this.usuarioService.currentUserData();



  }

  ngOnDestroy(){
    this.modeInscription.unsubscribe();
    this.destroyExperience$.forEach( exp => exp.unsubscribe());
    this.destroyUserData$.unsubscribe();
  }

  fillForm(){
      this.workerForm = this.formBuilder.group({
        nome: '',
        projetoAtual : '',
        gerenteAtual : '',
        habilidades : '',
        experiencias : []
    });

      this.editWorkerForm = this.formBuilder.group({
        nome : '',
        projetoAtual : '',
        gerenteAtual : '',
        habilidades : '',
        experiencias : []
    });

    this.viewWorkerForm= this.formBuilder.group({
      nome : '',
      projetoAtual : '',
      gerenteAtual : '',
      habilidades : '',
      experiencias : []
  });
  }

  fillFormExperiencias(index){
    this.experienciesForm.push(this.formBuilder.group({
      nomeEmpresa : '',
      cargo : '',
      atividadesRealizadas : '',
      inicio : null,
      fim : null,
    })
    );
  }

  formToDTO(form: FormGroup): Colaborador{
    let worker = new Colaborador();
    worker.nome = form.value['nome'];
    worker.projetoAtual = form.value['projetoAtual'];
    worker.gerenteAtual = form.value['gerenteAtual'];
    worker.habilidades = form.value['habilidades'];
    worker.codigoUsuario = {codigo: this.currentUser['codigo']};
    return worker;
  }

  experiencesFormToDTO(forms: FormGroup[], codWorker): Experiencias[]{
    let listExperiences = [];

    forms.forEach(form => {
    let experience = new Experiencias();
    experience.nomeEmpresa = form.value['nomeEmpresa'];
    experience.cargo = form.value['cargo'];
    experience.atividadesRealizadas = form.value['atividadesRealizadas'];
    experience.inicio = form.value['inicio'];
    experience.fim = form.value['fim'];
    experience.codigoColaborador = { codigo: codWorker };
    listExperiences.push(experience);

    });

    return listExperiences;
  }

  onSubmit(){
    this.submitted = true;
    if(this.workerForm.valid){
      this.doSaveProject();
    }
  }

  onCancel(){
    this.submitted = false;
    this.workerForm.reset();
    this.editWorkerForm.reset();
  }

  addExperiencia(exp){
    this.fillFormExperiencias(this.lastIndexExperience);
    this.lastIndexExperience++;
  }

  async doSaveProject(){
    this.workerService.save(this.formToDTO(this.workerForm)).pipe(takeUntil(this.destroyWorker$)).subscribe(
      workerSaved => {
        this.doSaveExperience(this.experiencesFormToDTO(this.experienciesForm, workerSaved.codigo));
        this.validRequestMessage(TypeMessage.REQUEST_OK);

      },);
  }

  async doSaveExperience(listExperiences){
    listExperiences.forEach(element => {
        this.destroyExperience$.push(new Subject<void>());
    });
    for(let i =0; i < listExperiences.length; i++){
      this.experienceService.save(listExperiences[i]).pipe(takeUntil(this.destroyExperience$[i])).subscribe()
      exp =>{
        this.onCancel();
      }
    }

  }


  validRequestMessage(requestResult){
    debugger
    if(requestResult === TypeMessage.REQUEST_OK){
      this.requestMessage = Util.successSaveMessage();
      this.requestStatus = true;
    }
    else if(requestResult === TypeMessage.INVALID_PASSWORD){
      this.requestMessage =  Util.errorInvalidPassword();
      this.requestStatus = false;
    }
    else if(requestResult === TypeMessage.INVALID_REQUEST){
      this.requestMessage = Util.errorSaveMessage();
      this.requestStatus = false;
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

  async doListWorkers(){
    this.workerService.list().pipe(takeUntil(this.destroyWorker$)).subscribe(
      workerList => {
        this.hasResults = true;
          workerList.forEach(worker => this.doListExperience(worker));
        this.getMessagens();
        return this.workerList = workerList
      },);
    }

   getMessagens(){
      if(this.hasResults){
        this.requestMessage = Util.successMessage();
      }
      else if(!this.hasResults){
        this.requestMessage = Util.errorNotFound();
      }
    }

  private cleanValues(){
      this.workerForm.reset();
      this.experienciesForm.forEach(exp => exp.reset());
  }


  filterWorkers(){

  if(this.workerList.length === 0 || this.filterWorker === undefined || this.filterWorker.trim() === ''){
      return this.workerList;
  }
  let filterLower = this.filterWorker.toLowerCase();
    return this.workerList.filter(
    element => {
      if (element['nome'].toLowerCase().indexOf(filterLower) >= 0){
        return true;
      }
      return false;
    }
  );
}

viewWorker(worker){
  this.viewWorkerForm.get('nome').setValue(worker.nome);
  this.viewWorkerForm.get('projetoAtual').setValue(worker.projetoAtual);
  this.viewWorkerForm.get('gerenteAtual').setValue(worker.gerenteAtual);
  this.viewWorkerForm.get('habilidades').setValue(worker.habilidades);
}

async doListExperience(worker){
   this.experienceService.list(worker).pipe(takeUntil(this.destroyGetExperience$)).subscribe(
    experienceList => {
    this.hasResults = true;
    this.getMessagens();
    return this.experienceListView = this.experienceListView.concat(experienceList);
    },);
        }

deleteWorker(worker){

}

}
