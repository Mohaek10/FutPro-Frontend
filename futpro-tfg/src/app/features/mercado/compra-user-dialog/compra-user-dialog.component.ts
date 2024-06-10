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
import Swal from "sweetalert2";
import {FormatoNumeroPipe} from "../../../shared/pipes/formato-numero.pipe";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-compra-user-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    FormatoNumeroPipe,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './compra-user-dialog.component.html',
  styleUrl: './compra-user-dialog.component.css'
})
export class CompraUserDialogComponent {
  compraForm: FormGroup;
  precioTotal: number = 0;
  cantidad: number = 1;

  constructor(
    private fb: FormBuilder,
    private mercadoService: MercadoService,
    public dialogRef: MatDialogRef<CompraUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jugador: Jugador, ventaId: number, precio: number, cantidad: number }
  ) {
    this.compraForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(data.cantidad)]]
    });
    this.updatePrecioTotal();
  }

  updatePrecioTotal(): void {
    const cantidad = this.compraForm.get('cantidad')?.value || 0;
    this.precioTotal = cantidad * this.data.precio;
  }

  comprar(): void {
    if (this.compraForm.valid) {
      const cantidad = this.compraForm.get('cantidad')?.value;
      this.mercadoService.comprarJugadorUsuario(this.data.ventaId, cantidad).subscribe({
        next: response => {
          Swal.fire('Compra realizada exitosamente', '', 'success');
          this.dialogRef.close({success: true, message: 'Compra realizada exitosamente.', response});

        },
        error: err => {
          Swal.fire('Error', err.error.error || 'Error al realizar la compra.', 'error');
          this.dialogRef.close({success: false, message: err.error.error || 'Error al realizar la compra.'});
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
