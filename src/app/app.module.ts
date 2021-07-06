import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ProjetoService } from './services/projeto-service';
import { RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';
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
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProjetoService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
