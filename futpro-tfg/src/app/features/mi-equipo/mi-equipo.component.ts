import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {JugadorComponent} from "../../shared/components/jugador/jugador.component";
import {Jugador} from "../../shared/models/jugador.models";

@Component({
  selector: 'app-mi-equipo',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgForOf,
    JugadorComponent
  ],
  templateUrl: './mi-equipo.component.html',
  styleUrls: ['./mi-equipo.component.css']
})
export class MiEquipoComponent implements OnInit {
  delanteros: Jugador[] = [];
  centrocampistas: Jugador[] = [];
  defensasYPorteros: Jugador[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getJugadores();


  }

  getJugadores() {
    this.userService.getMisJuagdores().subscribe(response => {
      const jugadores = response.results.map((j: any) => j.jugadorSerializado);

      this.delanteros = jugadores.filter((j: any) => ['DC', 'EI', 'ED', 'SD'].includes(j.posicion));
      this.centrocampistas = jugadores.filter((j: any) => ['MCO', 'CM', 'CDM'].includes(j.posicion));
      this.defensasYPorteros = jugadores.filter((j: any) => ['DFC', 'LD', 'LI', 'CAD', 'CAI', 'PT'].includes(j.posicion));
    });
  }

}
