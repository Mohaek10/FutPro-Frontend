import {Component, Input} from '@angular/core';
import {Jugador} from "../../models/jugador.models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-jugador',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './jugador.component.html',
  styleUrl: './jugador.component.css'
})
export class JugadorComponent {
  @Input() jugador!: Jugador;


}
