import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UsuarioBackEnd } from './services/usuario-backend';
import Util from './utils/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'smart-select-front';
  currentUser = null;
  showMenu: boolean = false;
  private destroyUserData$: Subject<void> = new Subject<void>();

  constructor(private loginService: UsuarioBackEnd,
    private router: Router
    ){

  }
  ngOnDestroy(): void {
    this.destroyUserData$.unsubscribe();

  }

  ngOnInit(): void {
    this.loginService.showMenuEmitter.subscribe(
      canShow =>{
        this.showMenu = canShow;
        }
    );
    this.loginService.user.pipe(takeUntil(this.destroyUserData$)).subscribe( user => {
      this.currentUser = user;
    });
  }

  logout(){
    this.showMenu = false;
    this.router.navigate(['/login']);

  }

  getRoute(){
    return this.router.url;
  }



}
