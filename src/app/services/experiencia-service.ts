import { ExperienciaBackEnd } from './experiencia-backend';
import { Injectable } from '@angular/core';
import Projeto from '../models/Projeto';
import { Observable } from 'rxjs';
import Usuario from '../models/Usuario';
import Colaborador from '../models/Colaborador';
import Experiencias from '../models/Experiencias';


@Injectable({
    providedIn: 'root',
})
export class ExperienceService {

    constructor(
        private experienciaBack: ExperienciaBackEnd,
    ) { }

    list(worker: Colaborador): Observable<Experiencias[]> {
        return  this.experienciaBack.list(worker);
    }

    save(experiencies: Experiencias): Observable<Experiencias[]> {
      return  this.experienciaBack.post(experiencies);
    }
}
