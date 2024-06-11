import {Component, Inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
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
  localStorage = localStorage.getItem('currentUser')?.toString();
  usuario = JSON.parse(this.localStorage || '{}');
  nombreDelUsuario = this.usuario.first_name + ' ' + this.usuario.last_name;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CompraFutcoinsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lote: any }
  ) {
    this.compraForm = this.fb.group({
      numero_tarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), numeroTarjetaValidator, sinEspaciosValidator]],
      fecha_expiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/), fechaExpiracionValidator]],
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

function fechaExpiracionValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const [month, year] = value.split('/').map(Number);
  const currentYear = new Date().getFullYear() % 100;

  if (month > 12 || month < 1) {
    return {'monthInvalid': true};
  }

  if (year < currentYear || year < 24) {
    return {'yearInvalid': true};
  }

  return null;
}

function numeroTarjetaValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isNumber = !isNaN(value);

  if (!isNumber) {
    return {'notNumber': true};
  }

  return null;
}

function sinEspaciosValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const tieneEspacios = /\s/.test(value);

  if (tieneEspacios) {
    return {'tieneEspacios': true};
  }

  return null;
}
