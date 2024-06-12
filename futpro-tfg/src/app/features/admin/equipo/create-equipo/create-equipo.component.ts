import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {EquiposService} from "../../../../core/services/equipos.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Equipo} from "../../../../shared/models/equipo.models";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {Location, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-create-equipo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    NgIf,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './create-equipo.component.html',
  styleUrl: './create-equipo.component.css'
})
export class CreateEquipoComponent implements OnInit {
  equipoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private equiposService: EquiposService,
    private router: Router,
    private snackBar: MatSnackBar,
    public location: Location,
  ) {
    this.equipoForm = this.fb.group({
      nombre: ['', [Validators.required, NoWhitespaceValidator()]],
      liga: ['', [Validators.required, NoWhitespaceValidator()]],
      pais: ['', [Validators.required, NoWhitespaceValidator()]],
      escudo: ['', [Validators.required, NoWhitespaceValidator()]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.equipoForm.valid) {
      const equipo: Equipo = this.equipoForm.value;
      this.equiposService.createEquipo(equipo).subscribe({
        next: () => {
          this.snackBar.open('Equipo creado exitosamente', 'Cerrar', {duration: 3000});
          this.router.navigate(['/admin/equipos']);
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Error al crear el equipo. Verifica los datos.';
          this.snackBar.open(errorMsg, 'Cerrar', {duration: 5000});
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {duration: 5000});
    }
  }

  goBack(): void {
    this.location.back();
  }
}

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  };
}
