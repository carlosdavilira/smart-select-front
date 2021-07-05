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

    get(usuario: Colaborador): Observable<Colaborador> {
        return  this.colaboradorBack.get(usuario);
    }

    save(usuario: Colaborador): Observable<Colaborador> {
      return  this.colaboradorBack.post(usuario);
    }

    list(): Observable<Colaborador[]> {
      return  this.colaboradorBack.list();
    }
}
