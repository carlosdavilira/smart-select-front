import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import Colaborador from '../models/Colaborador';

import Util from '../utils/util';



@Injectable({
    providedIn: 'root',
})
export class ColaboradorBackEnd {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }

    get(worker: Colaborador): Observable<Colaborador> {
      return this.http.get(`${Util.getUrl()}/colaborador/${worker.codigo}`,
          { headers: this.headers },
      ).pipe(
          map((res) => {
            debugger;
            let worker = new Colaborador()
            worker.codigo = res['codigo'];
            worker.nome = res['nome'];
            worker.projetoAtual = res['projetoAtual'];
            worker.gerenteAtual = res['gerenteAtual'];
            worker.habilidades = res['habilidades'];
            worker.experiencias = res['experiencias'];
            return worker;
            }),
          share(),
      );
  }

post(worker: Colaborador): Observable<Colaborador> {
  debugger;
  return this.http.post(`${Util.getUrl()}/colaborador`,
      JSON.stringify(worker),
      { headers: this.headers },
  ).pipe(
      map((res) => {
        debugger;
        let worker = new Colaborador()
        worker.codigo = res['codigo'];
        worker.nome = res['nome'];
        worker.projetoAtual = res['projetoAtual'];
        worker.gerenteAtual = res['gerenteAtual'];
        worker.habilidades = res['habilidades'];
        worker.experiencias = res['experiencias'];
        return worker;
        }),
      share(),
  );
}

list(): Observable<Colaborador[]> {
  return this.http.get(`${Util.getUrl()}/colaborador`,
      { headers: this.headers },
  ).pipe(
      map((res) => {
        return this.doList(res);
        }),
      share(),
  );
}

private doList(workers): any {
  let listWorkers = [];

  workers.forEach(res => {
    let worker = new Colaborador()
    worker.codigo = res['codigo'];
    worker.nome = res['nome'];
    worker.projetoAtual = res['projetoAtual'];
    worker.gerenteAtual = res['gerenteAtual'];
    worker.habilidades = res['habilidades'];
    worker.experiencias = res['experiencias'];
    listWorkers.push(worker);
  });

  return listWorkers;
}

}
