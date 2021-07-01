import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ProjetoService } from './services/projeto-service';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';
/*const routes: Routes = [
  { path: 'projeto', component: ProjetoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'rel', component: RelatorioComponent }
];*/


@NgModule({
  declarations: [
    AppComponent,
    ProjetoComponent,
    ColaboradorComponent,
    UsuarioComponent,
    RelatorioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    RouterModule
  ],
  providers: [ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
