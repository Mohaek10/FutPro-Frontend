import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-compra-futcoins-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatDialogActions,
    MatLabel,
    MatError
  ],
  templateUrl: './compra-futcoins-dialog.component.html',
  styleUrl: './compra-futcoins-dialog.component.css'
})
export class CompraFutcoinsDialogComponent {
  compraForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompraFutcoinsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lote: any }
  ) {
    this.compraForm = this.fb.group({
      numero_tarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fecha_expiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  comprar(): void {
    if (this.compraForm.valid) {
      const compraData = {
        lote: this.data.lote.id,
        numero_tarjeta: this.compraForm.get('numero_tarjeta')?.value,
        fecha_expiracion: this.compraForm.get('fecha_expiracion')?.value,
        cvv: this.compraForm.get('cvv')?.value
      };
      this.userService.comprarFutCoins(compraData).subscribe({
        next: response => {
          console.log('FutCoins compradas', response);
          this.snackBar.open('FutCoins compradas exitosamente', 'Cerrar', {duration: 3000});
          this.dialogRef.close({success: true});
        },
        error: err => {
          console.error('Error al comprar FutCoins', err);
          this.snackBar.open('Error al comprar FutCoins. Verifica los datos e intenta de nuevo.' + err, 'Cerrar', {duration: 5000});
        }
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }


}
