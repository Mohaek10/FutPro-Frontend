import {Component, OnInit} from '@angular/core';
import {LoteFutCoins} from "../../shared/models/lote-futcoins.models";
import {UserService} from "../../core/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CompraFutcoinsDialogComponent} from "./compra-futcoins-dialog/compra-futcoins-dialog.component";
import {AuthService} from "../../core/services/auth.service";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {FormatoNumeroPipe} from "../../shared/pipes/formato-numero.pipe";

@Component({
  selector: 'app-futcoins',
  standalone: true,
  imports: [
    MatButton,
    NgForOf,
    FormatoNumeroPipe
  ],
  templateUrl: './futcoins.component.html',
  styleUrl: './futcoins.component.css'
})
export class FutcoinsComponent implements OnInit {
  lotes: LoteFutCoins[] = [];

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.userService.getLotesFutCoins().subscribe(response => {
      this.lotes = response.results;
    });
  }

  openCompraDialog(lote: LoteFutCoins): void {
    const dialogRef = this.dialog.open(CompraFutcoinsDialogComponent, {
      width: '600px',
      data: {lote}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        // Actualizar los datos del usuario si la compra fue exitosa
        this.authService.updateUser();
      }
    });
  }
}
