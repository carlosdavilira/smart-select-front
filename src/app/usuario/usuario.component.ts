import { TypeAccess } from './../models/TypeAccess';
import { TypeMessage } from './../models/TypeMessage';
import { UsuarioBackEnd } from './../services/usuario-backend';
import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Usuario from '../models/Usuario';
import { UsuarioService } from '../services/usuario-service';
import { takeUntil } from 'rxjs/operators';
import Util from '../utils/util';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

    // -- Forms
    userForm: FormGroup;

    private destroyUser$: Subject<void> = new Subject<void>();
    requestMessage = '';
    submitted = false;
    requestStatus = null;
    hasResults = false;
    userTypes = ['SUPER', 'MANAGER','USER'];
    userTypeSelected = '';


  constructor(private projetoService: UsuarioService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }
  ngOnDestroy(): void {
    this.destroyUser$.unsubscribe();
  }

  ngOnInit() {

    this.fillForm();
  }

  fillForm(){

    this.userForm = this.formBuilder.group({
      id:  '',
      usuario : '',
      senha : '',
      confirmaSenha: ''
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.validPass(this.userForm)){
      this.validRequestMessage(TypeMessage.INVALID_PASSWORD);
      return ;
    }
    if(this.userForm.valid){
      this.doSaveProject();
    }
  }

  onCancel(){
    this.submitted = false;
    this.userForm.reset();
  }

  formToDTO(): Usuario{
    let user = new Usuario();
    user.usuario = this.userForm.value['usuario'];
    user.senha = this.userForm.value['senha'];
    user.tipo = this.userTypeSelected;
    return user;
  }

  async doSaveProject(){
    this.projetoService.save(this.formToDTO()).pipe(takeUntil(this.destroyUser$)).subscribe(
      user => {
        this.validRequestMessage(TypeMessage.REQUEST_OK);
        this.onCancel();
      },);
  }

  validRequestMessage(requestResult){
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

  validPass(user){
    return (user.value['senha'].toLowerCase().match(user.value['confirmaSenha'].toLowerCase()) === null);
  }

  onSelectUserType(userType){
    this.userTypeSelected = userType;

  }

}
