import {Component, Input} from '@angular/core';
import {Jugador} from "../../models/jugador.models";
import {trigger, state, style, transition, animate} from '@angular/animations';
import {CurrencyPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {FormatoNumeroPipe} from "../../pipes/formato-numero.pipe";
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CompraDialogComponent} from "../../../features/mercado/compra-dialog/compra-dialog.component";

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css'],
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    FormatoNumeroPipe,
    CurrencyPipe,
    NgIf
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
  @Input() showComprar: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {
  }

  openComprarModal(): void {
    const dialogRef = this.dialog.open(CompraDialogComponent, {
      width: '400px',
      data: {jugador: this.jugador}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log('Compra realizada exitosamente');
      }
    });
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

}
