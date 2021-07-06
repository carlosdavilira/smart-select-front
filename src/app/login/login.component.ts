import { UsuarioService } from './../services/usuario-service';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Usuario from '../models/Usuario';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TypeMessage } from '../models/TypeMessage';
import Util from '../utils/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router:Router
    ) { }

    requestMessage = '';
    submitted = false;
    requestStatus = null;
    hasResults = false;


  loginForm: FormGroup;
  private destroyUser$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.fillLogin();
  }

  ngOnDestroy(): void {
    this.destroyUser$.unsubscribe();
  }

  onSubmit(){

  }
  async doLogin(){
    this.usuarioService.login(this.formToDTO()).pipe(takeUntil(this.destroyUser$)).subscribe(
      user => {
        debugger;
        console.log(user);
        if(user){
          this.router.navigate(['/']);
        }else{
          this.validRequestMessage(TypeMessage.INVALID_PASSWORD);
        }

      },);
  }

  fillLogin(){
    this.loginForm = this.formBuilder.group({
      codigo : null,
      usuario : '',
      senha : ''
    });
  }


  formToDTO(): Usuario{
    let user = new Usuario();
    user.usuario = this.loginForm.value['usuario'];
    user.senha = this.loginForm.value['senha'];
    return user;
  }

  validRequestMessage(requestResult){
    debugger
    if(requestResult === TypeMessage.INVALID_PASSWORD){
      this.requestMessage =  Util.errorInvalidCredentials();
      this.requestStatus = false;
    }
    else if(requestResult === TypeMessage.INVALID_REQUEST){
      this.requestMessage = Util.errorSaveMessage();
      this.requestStatus = false;
    }

    console.log(this.requestMessage);
  }

  closeErrorRequest(){
    this.requestStatus = null;
  }

}
