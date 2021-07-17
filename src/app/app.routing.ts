import { AppComponent } from './app.component';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColaboradorComponent } from "./colaborador/colaborador.component";
import { AuthGuard } from "./guards/auth-guard";
import { LoginComponent } from "./login/login.component";
import { ProjetoComponent } from "./projeto/projeto.component";
import { RelatorioComponent } from "./relatorio/relatorio.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { NotFoundComponent } from './not-found/not-found.component';

const APP_ROUTES: Routes = [
  { path: '', component: ProjetoComponent, canActivate:[AuthGuard] },
  { path: 'home', component: AppComponent, canActivate:[AuthGuard] },
  { path: 'projeto/:mode', component: ProjetoComponent, canActivate:[AuthGuard] },
  { path: 'projeto', component: ProjetoComponent, canActivate:[AuthGuard] },
  { path: 'usuario/:mode', component: UsuarioComponent, canActivate:[AuthGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate:[AuthGuard] },
  { path: 'colaborador', component: ColaboradorComponent, canActivate:[AuthGuard] },
  { path: 'colaborador/:mode', component: ColaboradorComponent, canActivate:[AuthGuard] },
  { path: 'rel', component: RelatorioComponent, canActivate:[AuthGuard] },
  { path: 'doc', component: RelatorioComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
