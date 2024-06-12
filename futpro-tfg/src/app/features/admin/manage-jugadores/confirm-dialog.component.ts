import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Eliminar Jugador</h2>
    <mat-dialog-content>¿Estás seguro de que deseas eliminar este jugador?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button cdkFocusInitial (click)="onYesClick()">Sí</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  standalone: true
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
