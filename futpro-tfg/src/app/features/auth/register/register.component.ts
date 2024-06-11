import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatError,
    MatButton,
    MatLabel,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), NoWhitespaceValidator()]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required, Validators.minLength(3), NoWhitespaceValidator()]],
      last_name: ['', [Validators.required, Validators.minLength(3), NoWhitespaceValidator()]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/.*\d.*/)]], // Añadido el validador de patrón
      password2: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {validators: this.validacionConfirm});
  }

  validacionConfirm(form: FormGroup) {
    return form.get('password')?.value === form.get('password2')?.value
      ? null : {'mismatch': true};
  }

  register(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      console.log(user);
      this.authService.register(user).subscribe({
        next: () => {
          this.snackBar.open('Registro exitoso', 'Cerrar', {duration: 3000});
          this.router.navigate(['/']);
        },
        error: (err) => {
          const errorMessages = this.parseErrorMessages(err);
          this.snackBar.open(errorMessages, 'Cerrar', {duration: 5000});
        }
      });
    }
  }

  private parseErrorMessages(err: any): string {
    if (err.error) {
      if (typeof err.error === 'string') {
        return err.error;
      } else if (typeof err.error === 'object') {
        return Object.values(err.error).map((error: any) => error.join(' ')).join(' ');
      }
    }
    return 'Error al crear el jugador. Verifica los datos.';
  }
}

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  };
}
