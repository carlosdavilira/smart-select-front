import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ColaboradorComponent } from "./colaborador/colaborador.component";
import { ProjetoComponent } from "./projeto/projeto.component";
import { RelatorioComponent } from "./relatorio/relatorio.component";
import { UsuarioComponent } from "./usuario/usuario.component";

const APP_ROUTES: Routes = [
  { path: 'projeto', component: ProjetoComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'rel', component: RelatorioComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
