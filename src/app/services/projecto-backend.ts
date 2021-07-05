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
      return this.http.get(`${Util.getUrl()}/projeto/${projeto.codigo}`,
          { headers: this.headers },
      ).pipe(
          map((res) => {
            debugger;
             let projeto = new Projeto()
            projeto.codigo = res['codigo'];
            projeto.descricao = res['descricao'];
            projeto.habilidades = res['habilidades'];
            projeto.tempos = res['tempos'];
            return projeto;
            }),
          share(),
      );
  }

  list(): Observable<Projeto[]> {
    let projectList = [];
    return this.http.get(`${Util.getUrl()}/projeto`,
        { headers: this.headers },
    ).pipe(
        map((res) => {
          return this.doList(res);
          }),
        share(),
    );
}

post(projeto: Projeto): Observable<Projeto> {
  debugger;
  return this.http.post(`${Util.getUrl()}/projeto`,
      JSON.stringify(projeto),
      { headers: this.headers },
  ).pipe(
      map((res) => {
        debugger;
        let projeto = new Projeto()
        projeto.codigo = res['codigo'];
        projeto.descricao = res['descricao'];
        projeto.habilidades = res['habilidade'];
        projeto.tempos = res['tempos'];
        return projeto;
        }),
      share(),
  );
}

private doList(projects): any {
  let listProjects = [];

  projects.forEach(element => {
    let projeto = new Projeto()
    projeto.codigo = element['codigo'];
    projeto.descricao = element['descricao'];
    projeto.habilidades = element['habilidades'];
    projeto.tempos = element['tempos'];
    listProjects.push(projeto);
  });

  return listProjects;
}

}
