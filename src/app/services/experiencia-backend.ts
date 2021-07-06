import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import Colaborador from '../models/Colaborador';
import Experiencias from '../models/Experiencias';
import Usuario from '../models/Experiencias';

import Util from '../utils/util';



@Injectable({
    providedIn: 'root',
})
export class ExperienciaBackEnd {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
    ) { }

    list(colaborador: Colaborador): Observable<Experiencias[]> {
      return this.http.get(`${Util.getUrl()}/experiencia/${colaborador.codigo}`,
          { headers: this.headers },
      ).pipe(
          map((res) => {
            return this.doList(res);
            }),
          share(),
      );
  }

post(experience: Experiencias): Observable<Experiencias[]> {
  debugger;
  return this.http.post(`${Util.getUrl()}/experiencia`,
      JSON.stringify(experience),
      { headers: this.headers },
  ).pipe(
      map((res) => {
        return this.doList(res);
        }),
      share(),
  );
}

private doList(workers): any {
  let listExperiences = [];

  workers.forEach(res => {
    let experience = new Experiencias()
    experience.codigo = res['codigo'];
    experience.nomeEmpresa = res['nomeEmpresa'];
    experience.cargo = res['cargo'];
    experience.atividadesRealizadas = res['atividadesRealizadas'];
    experience.inicio = res['inicio'];
    experience.fim = res['fim'];
    listExperiences.push(experience);
  });

  return listExperiences;
}
}
