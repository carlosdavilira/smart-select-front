import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioBackEnd } from './services/usuario-backend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'smart-select-front';
  showMenu: boolean = false;
  constructor(private loginService: UsuarioBackEnd,
    private router: Router){

  }

  ngOnInit(): void {
    this.loginService.showMenuEmitter.subscribe(
      canShow =>{
        this.showMenu = canShow;
        }
    );
  }

  logout(){
    this.showMenu = false;
    this.router.navigate(['/login']);

  }

  getRoute(){
    debugger;
    console.log(this.router.url);
    return this.router.url;
  }



}
