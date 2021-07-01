import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import Projeto from '../models/Projeto';

import Util from '../utils/util';



@Injectable({
    providedIn: 'root',
})
export class ProjetoBackEnd {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }

    get(projeto: Projeto): Observable<Projeto> {
      //return this.http.get(`${Util.getUrl()}projeto/${projeto.id}`,
      return this.http.get(`${Util.getUrl()}/projeto/${projeto.id}`,
          { headers: this.headers },
      ).pipe(
          map((res) => {
            debugger;
             let projeto = new Projeto()
            projeto.id = res['codigo'];
            projeto.descricao = res['descricao'];
            projeto.habilidades = res['habilidade'];
            projeto.tempos = res['tempos'];
            return projeto;
            }),
          share(),
      );
  }

}
