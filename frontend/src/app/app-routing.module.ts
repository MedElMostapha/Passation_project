import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {DefaultSidebarComponent} from './components/default-sidebar/default-sidebar.component';

import {AuthGuardService} from "./services/auth-guard.service";

import { AccueilComponent } from './pages/saisie/pages/accueil/accueil.component';
import {PaaComponent} from "./pages/saisie/pages/paa/paa/paa.component";
import {DirectoryComponent} from "./pages/saisie/pages/directory/directory.component";
import { EtablissemntPaaComponent } from './pages/saisie/pages/etablissemnt-paa/etablissemnt-paa.component';
import { ProcedureComponent } from './procedure/procedure.component';
import { EtablissementComponent } from './pages/saisie/pages/etablissement/etablissement.component';
import { InputBudgetaireComponent } from './pages/saisie/pages/input-budgetaire/input-budgetaire.component';



const routes: Routes = [
  {path: 'sidebar', component: DefaultSidebarComponent,canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent,canActivate: [AuthGuardService]},
  { path: 'register', component : RegisterComponent,canActivate: [AuthGuardService] },
  { path: "Accueil", component: AccueilComponent, canActivate: [AuthGuardService] },
  { path: "paa", component: PaaComponent, canActivate: [AuthGuardService] },
  { path: "directory", component: DirectoryComponent, canActivate: [AuthGuardService] },
  { path: "etablissementpaa", component: EtablissemntPaaComponent, canActivate: [AuthGuardService] },
  { path: "etablissement", component: EtablissementComponent, canActivate: [AuthGuardService] },
  { path: "input", component: InputBudgetaireComponent, canActivate: [AuthGuardService] },
  { path: 'procedure-list', component: ProcedureComponent, canActivate: [AuthGuardService] },
  {path: '', redirectTo: 'login', pathMatch: 'full',},

//
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
