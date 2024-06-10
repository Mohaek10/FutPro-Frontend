import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MercadoService} from "../../../core/services/mercado.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Jugador} from "../../../shared/models/jugador.models";

@Component({
  selector: 'app-compra-dialog',
  standalone: true,
  imports: [],
  templateUrl: './compra-dialog.component.html',
  styleUrl: './compra-dialog.component.css'
})
export class CompraDialogComponent {
  compraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mercadoService: MercadoService,
    public dialogRef: MatDialogRef<CompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jugador: Jugador }
  ) {
    this.compraForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]]

    });
  }

  comprar(): void {
    if (this.compraForm.valid) {
      const cantidad = this.compraForm.get('cantidad')?.value;
      this.mercadoService.comprarJugadorSistema(this.data.jugador.id, cantidad).subscribe({
        next: response => {
          this.dialogRef.close({success: true, message: 'Compra realizada exitosamente.', response});
        },
        error: err => {
          this.dialogRef.close({success: false, message: err.error.error || 'Error al realizar la compra.'});
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
