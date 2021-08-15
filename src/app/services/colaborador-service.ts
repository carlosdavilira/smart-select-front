import { ColaboradorBackEnd } from './colaborador-backend';
import { Injectable } from '@angular/core';
import Projeto from '../models/Projeto';
import { Observable } from 'rxjs';
import Colaborador from '../models/Colaborador';


@Injectable({
    providedIn: 'root',
})
export class ColaboradorService {

    constructor(
        private colaboradorBack: ColaboradorBackEnd,
    ) { }

    get(worker: Colaborador): Observable<Colaborador> {
        return  this.colaboradorBack.get(worker);
    }

    getByUserCode(worker: Colaborador): Observable<Colaborador> {
      return  this.colaboradorBack.getByUserCode(worker);
  }

    save(worker: Colaborador): Observable<Colaborador> {
      return  this.colaboradorBack.post(worker);
    }

    list(): Observable<Colaborador[]> {
      return  this.colaboradorBack.list();
    }

    update(worker: Colaborador): Observable<Colaborador> {
      return  this.colaboradorBack.put(worker);
    }
}
