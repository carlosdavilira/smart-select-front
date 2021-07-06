import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import Usuario from '../models/Usuario';

import Util from '../utils/util';



@Injectable({
    providedIn: 'root',
})
export class UsuarioBackEnd {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }
    public showMenuEmitter = new EventEmitter<boolean>();
    private userAutenticated = false;


    get(usuario: Usuario): Observable<Usuario> {
      return this.http.get(`${Util.getUrl()}/usuario/${usuario.codigo}`,
          { headers: this.headers },
      ).pipe(
          map((res) => {
            debugger;
            let user = new Usuario()
            user.codigo = res['codigo'];
            user.usuario = res['descricao'];
            return user;
            }),
          share(),
      );
  }

post(usuario: Usuario): Observable<Usuario> {
  debugger;
  return this.http.post(`${Util.getUrl()}/usuario`,
      JSON.stringify(usuario),
      { headers: this.headers },
  ).pipe(
      map((res) => {
        debugger;
        let user = new Usuario()
        user.codigo = res['codigo'];
        user.usuario = res['usuario'];
        return user;
        }),
      share(),
  );
}

login(usuario: Usuario): Observable<Usuario> {
  debugger;
  return this.http.post(`${Util.getUrl()}/usuario/login`,
      JSON.stringify(usuario),
      { headers: this.headers },
  ).pipe(
      map((res) => {
        debugger;
        if(res){
        this.showMenuEmitter.emit(true);
        this.userAutenticated = true;

        let user = new Usuario()
        user.codigo = res['codigo'];
        user.usuario = res['usuario'];
        return user;
      }
      this.userAutenticated = false;
      this.showMenuEmitter.emit(false);
      return null;
        }),
      share(),
  );
}
public isUserAutenticated(){
  return this.userAutenticated;
}
}
