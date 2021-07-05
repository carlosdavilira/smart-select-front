import { UsuarioBackEnd } from './usuario-backend';
import { Injectable } from '@angular/core';
import Projeto from '../models/Projeto';
import { Observable } from 'rxjs';
import Usuario from '../models/Usuario';


@Injectable({
    providedIn: 'root',
})
export class UsuarioService {

    constructor(
        private usuarioBack: UsuarioBackEnd,
    ) { }

    get(usuario: Usuario): Observable<Usuario> {
        return  this.usuarioBack.get(usuario);
    }

    save(usuario: Usuario): Observable<Usuario> {
      return  this.usuarioBack.post(usuario);
    }
}
