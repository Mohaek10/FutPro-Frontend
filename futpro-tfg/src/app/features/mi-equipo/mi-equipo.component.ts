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
  styleUrl: './mi-equipo.component.css'
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
    this.formacion[index] = JSON.parse(event.dataTransfer?.getData('jugador') || '{}');
  }

  allowDrop(event: any): void {
    event.preventDefault();
  }

  dragStart(event: any, jugador: any): void {
    event.dataTransfer.setData('jugador', JSON.stringify(jugador));
  }

}
