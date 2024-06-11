import {Component, OnInit} from '@angular/core';
import {Jugador} from "../../../../shared/models/jugador.models";
import {ActivatedRoute} from "@angular/router";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {CurrencyPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-jugador',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './view-jugador.component.html',
  styleUrl: './view-jugador.component.css'
})
export class ViewJugadorComponent implements OnInit {
  jugador: Jugador | null = null;
  jugadorId: number | null = null;

  constructor(private route: ActivatedRoute, private jugadoresService: JugadoresService, private location: Location) {
  }

  ngOnInit(): void {
    this.jugadorId = this.route.snapshot.params['id'];
    if (this.jugadorId) {
      this.jugadoresService.getJugador(this.jugadorId).subscribe(jugador => {
        console.log(jugador);
        this.jugador = jugador;
      });
    }
  }

  goBack() {
    this.location.back();
  }

}
