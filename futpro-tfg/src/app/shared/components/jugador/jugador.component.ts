import {Component, Input} from '@angular/core';
import {Jugador} from "../../models/jugador.models";
import {trigger, state, style, transition, animate} from '@angular/animations';
import {CurrencyPipe, NgClass, NgStyle} from "@angular/common";
import {FormatoNumeroPipe} from "../../pipes/formato-numero.pipe";
import {Router} from '@angular/router';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css'],
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormatoNumeroPipe,
    CurrencyPipe
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

  constructor(private router: Router) {
  }

  getBorderColor(rareza: string): string {
    switch (rareza) {
      case 'Legendaria':
        return 'rgba(255,215,0,0.4)';
      case 'Épica':
        return 'rgba(138,43,226,0.4)';
      case 'Común':
        return 'rgba(128,128,128,0.4)';
      case 'Rara':
        return 'rgba(30,144,255,0.4)';
      default:
        return '#000000';
    }
  }

  navigateToDetail(): void {
    this.router.navigate(['/jugador', this.jugador.id]);
  }


  onMouseEnter() {
    this.cardState = 'hover';
  }

  onMouseLeave() {
    this.cardState = 'default';
  }

  protected readonly Number = Number;
  protected readonly parseFloat = parseFloat;
  protected readonly parseInt = parseInt;
}
