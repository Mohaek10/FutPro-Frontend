import {Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {ForbiddenComponent} from "./errors/forbidden/forbidden.component";
import {adminGuard} from "./core/guards/admin.guard";
import {RegisterComponent} from "./features/auth/register/register.component";
import {JugadorListComponent} from "./features/jugadores/jugador-list/jugador-list.component";
import {authGuard} from "./core/guards/auth.guard";
import {JugadorDetailComponent} from "./features/jugadores/jugador-detail/jugador-detail.component";
import {MercadoSisComponent} from "./features/mercado/mercado-sis/mercado-sis.component";
import {MiEquipoComponent} from "./features/mi-equipo/mi-equipo.component";
import {MercadoUseComponent} from "./features/mercado/mercado-use/mercado-use.component";
import {AdminDashboardComponent} from "./features/admin/admin-dashboard/admin-dashboard.component";
import {ManageJugadoresComponent} from "./features/admin/manage-jugadores/manage-jugadores.component";
import {ManageEquipoComponent} from "./features/admin/manage-equipo/manage-equipo.component";
import {ManageUsersComponent} from "./features/admin/manage-users/manage-users.component";
import {TransaccionesComponent} from "./features/admin/transacciones/transacciones.component";
import {CreateJugadorComponent} from "./features/admin/jugador/crate-jugador/create-jugador.component";
import {UpdateJugadorComponent} from "./features/admin/jugador/update-jugador/update-jugador.component";
import {ViewJugadorComponent} from "./features/admin/jugador/view-jugador/view-jugador.component";
import {CreateEquipoComponent} from "./features/admin/equipo/create-equipo/create-equipo.component";
import {UpdateEquipoComponent} from "./features/admin/equipo/update-equipo/update-equipo.component";
import {ViewEquipoComponent} from "./features/admin/equipo/view-equipo/view-equipo.component";
import {NotfoundComponent} from "./errors/notfound/notfound.component";

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forbidden', component: ForbiddenComponent},

  // Seccion de admin
  {path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/jugadores', component: ManageJugadoresComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/equipos', component: ManageEquipoComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/usuarios', component: ManageUsersComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/transacciones', component: TransaccionesComponent, canActivate: [authGuard, adminGuard]},
  // Seccion de admin -- Jugadores
  {path: 'admin/jugadores/edit/:id', component: UpdateJugadorComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/jugadores/view/:id', component: ViewJugadorComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/jugadores/create', component: CreateJugadorComponent, canActivate: [authGuard, adminGuard]},

  // Seccion de equipos
  {path: 'admin/equipos/edit/:id', component: UpdateEquipoComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/equipos/view/:id', component: ViewEquipoComponent, canActivate: [authGuard, adminGuard]},
  {path: 'admin/equipos/create', component: CreateEquipoComponent, canActivate: [authGuard, adminGuard]},

  {path: 'jugadores', component: JugadorListComponent},
  {path: 'jugador/:id', component: JugadorDetailComponent},
  {path: 'mercado-sis', component: MercadoSisComponent, canActivate: [authGuard]},
  {path: 'mercado-user', component: MercadoUseComponent, canActivate: [authGuard]},
  {path: 'mi-equipo', component: MiEquipoComponent, canActivate: [authGuard]},

  {path: '**', component: NotfoundComponent}
];
