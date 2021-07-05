import { Subject, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  Colaborador from '../models/Colaborador'
import Experiencias from '../models/Experiencias';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColaboradorService } from '../services/colaborador-service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit, OnDestroy {

  constructor( private projetoService: ColaboradorService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  consultMode = true;
  private showExp = true;
  private ListExperiencias = [];
  private mode = '';
  private Colaborador;
  private destroySensors$: Subject<void> = new Subject<void>();
  modeInscription: Subscription;

    // -- Forms
    workerForm: FormGroup;
    editWorkerForm:FormGroup;

    private destroyUser$: Subject<void> = new Subject<void>();
    requestMessage = '';
    submitted = false;
    requestStatus = null;
    hasResults = false;


  ngOnInit() {

    this.modeInscription =  this.route.params.subscribe(params => {
      this.mode = params['mode'];
      this.changeMode();
    })

  }

  ngOnDestroy(){
    this.modeInscription.unsubscribe();
  }

  fillForm(){
    if(this.consultMode){
      this.workerForm = this.formBuilder.group({
        nome: '',
        projetoAtual : '',
        gerenteAtual : '',
        habilidades : '',
        experiencias : []
    });
  }
    else{
      this.editWorkerForm = this.formBuilder.group({
        nome : '',
        projetoAtual : '',
        gerenteAtual : '',
        habilidades : '',
        experiencias : []
    });
    }

  }

  formToDTO(form: FormGroup): Colaborador{
    let worker = new Colaborador();
    worker.nome = form.value['nome'];
    worker.projetoAtual = form.value['projetoAtual'];
    worker.gerenteAtual = form.value['gerenteAtual'];
    worker.habilidades = form.value['habilidades'];
    worker.experiencias = form.value['experiencias'];
    return worker;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.workerForm.value);
    if(this.workerForm.valid){
      this.doSaveProject();
    }
  }

  onCancel(){
    this.submitted = false;
    this.workerForm.reset();
    this.editWorkerForm.reset();
  }

  addExperiencia(){
    this.ListExperiencias.push(new Experiencias());
    this.showExp = !this.showExp;
  }

  saveDataExperiencia(expIndice){{

  }

  }

  async doSaveProject(){

  }

  async doSaveExperience(){

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
