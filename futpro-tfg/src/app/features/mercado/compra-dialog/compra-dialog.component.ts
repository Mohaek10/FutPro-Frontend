import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MercadoService} from "../../../core/services/mercado.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Jugador} from "../../../shared/models/jugador.models";
import {FormatoNumeroPipe} from "../../../shared/pipes/formato-numero.pipe";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-compra-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    FormatoNumeroPipe,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './compra-dialog.component.html',
  styleUrl: './compra-dialog.component.css'
})
export class CompraDialogComponent {
  compraForm: FormGroup;
  precioTotal: number = 0;


  constructor(
    private fb: FormBuilder,
    private mercadoService: MercadoService,
    public dialogRef: MatDialogRef<CompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jugador: Jugador }
  ) {
    this.compraForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
    this.updatePrecioTotal();

  }

  updatePrecioTotal(): void {
    const cantidad = this.compraForm.get('cantidad')?.value || 0;
    this.precioTotal = cantidad * this.data.jugador.valor;
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
