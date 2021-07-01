import { ProjetoBackEnd } from './projecto-backend';
import { Injectable } from '@angular/core';
import Projeto from '../models/Projeto';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class ProjetoService {

    constructor(
        private projetoBack: ProjetoBackEnd,
    ) { }

    get(projeto: Projeto): Observable<Projeto> {
        return  this.projetoBack.get(projeto);
        //debugger;
        //return result;
    }


}
