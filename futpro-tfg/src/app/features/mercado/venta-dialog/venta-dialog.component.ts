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
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Jugador} from "../../../shared/models/jugador.models";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-venta-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './venta-dialog.component.html',
  styleUrl: './venta-dialog.component.css'
})
export class VentaDialogComponent {
  ventaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mercadoService: MercadoService,
    public dialogRef: MatDialogRef<VentaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { jugador: Jugador }
  ) {
    this.ventaForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [data.jugador.valor, [Validators.required, Validators.min(0)]]
    });
  }

  ponerEnVenta(): void {
    if (this.ventaForm.valid) {
      const {cantidad, precio} = this.ventaForm.value;
      this.mercadoService.ponerEnVenta(this.data.jugador.id_usuario_jugador, cantidad, precio).subscribe({
        next: response => {
          Swal.fire('Puesta en venta realizada exitosamente', '', 'success');
          this.dialogRef.close({success: true, message: 'Puesta en venta realizada exitosamente.', response});
        },
        error: err => {
          Swal.fire('Error', err.error.error + ' O ya lo tienes en venta, revisa el mercado de usuario' || 'Error al realizar la puesta en venta.', 'error');
          this.dialogRef.close({success: false, message: err.error.error || 'Error al realizar la puesta en venta.'});
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
