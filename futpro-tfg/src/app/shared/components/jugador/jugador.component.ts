import {Component, Input} from '@angular/core';
import {Jugador} from "../../models/jugador.models";
import {trigger, state, style, transition, animate} from '@angular/animations';
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css'],
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  animations: [
    trigger('cardHover', [
      state('default', style({
        transform: 'scale(1)',
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
      })),
      state('hover', style({
        transform: 'scale(1.05)',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)'
      })),
      transition('default <=> hover', [
        animate('0.5s')
      ])
    ])
  ]
})
export class JugadorComponent {
  @Input() jugador!: Jugador;
  cardState = 'default';

  getBorderColor(rareza: string): string {
    switch (rareza) {
      case 'Legendaria':
        return '#FFD700';
      case 'Épica':
        return '#8A2BE2';
      case 'Común':
        return '#808080';
      case 'Rara':
        return '#1E90FF';
      default:
        return '#000000';
    }
  }


  onMouseEnter() {
    this.cardState = 'hover';
  }

  onMouseLeave() {
    this.cardState = 'default';
  }
}
