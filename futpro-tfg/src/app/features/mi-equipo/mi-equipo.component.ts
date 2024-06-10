import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {NgForOf, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-mi-equipo',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgForOf
  ],
  templateUrl: './mi-equipo.component.html',
  styleUrls: ['./mi-equipo.component.css']
})
export class MiEquipoComponent implements OnInit {
  jugadores: any[] = [];
  formacion: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getMisJuagdores().subscribe(data => {
      this.jugadores = data.results;
      this.formacion = Array(11).fill(null);
    });
  }

  onDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    const jugador = JSON.parse(event.dataTransfer?.getData('jugador') || '{}');

    // Verificar si el jugador ya está en la formación
    const existingIndex = this.formacion.findIndex(j => j?.jugadorSerializado?.id === jugador.jugadorSerializado.id);
    if (existingIndex !== -1) {
      this.formacion[existingIndex] = null; // Quitar el jugador de la posición anterior
    }

    this.formacion[index] = jugador;

    // Quitar el jugador de la lista lateral
    this.jugadores = this.jugadores.filter(j => j.jugadorSerializado.id !== jugador.jugadorSerializado.id);
  }

  allowDrop(event: any): void {
    event.preventDefault();
  }

  dragStart(event: any, jugador: any): void {
    event.dataTransfer.setData('jugador', JSON.stringify(jugador));
  }

  removePlayer(index: number): void {
    const jugador = this.formacion[index];
    if (jugador) {
      this.jugadores.push(jugador); // Agregar el jugador de nuevo a la lista lateral
      this.formacion[index] = null; // Quitar el jugador de la formación
    }
  }
}
