import {Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ForbiddenComponent} from "./errors/forbidden/forbidden.component";
import {ManageUsersComponent} from "./features/admin/manage-users/manage-users.component";
import {adminGuard} from "./core/guards/admin.guard";
import {RegisterComponent} from "./features/auth/register/register.component";
import {JugadorListComponent} from "./features/jugadores/jugador-list/jugador-list.component";
import {authGuard} from "./core/guards/auth.guard";
import {JugadorDetailComponent} from "./features/jugadores/jugador-detail/jugador-detail.component";
import {MercadoSisComponent} from "./features/mercado/mercado-sis/mercado-sis.component";

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'admin/users', component: ManageUsersComponent, canActivate: [authGuard, adminGuard]},
  {path: 'jugadores', component: JugadorListComponent},
  {path: 'jugador/:id', component: JugadorDetailComponent},
  {path: 'mercado-sis', component: MercadoSisComponent, canActivate: [authGuard]},
];
