import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-crate-jugador',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatCheckbox,
    MatButton,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './create-jugador.component.html',
  styleUrl: './create-jugador.component.css'
})
export class CreateJugadorComponent {
  jugadorForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private jugadoresService: JugadoresService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.jugadorForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      equipo: ['', Validators.required],
      media: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      rareza: ['', Validators.required],
      imagen: [null, Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      posicion: ['', Validators.required],
      en_mercado: [true],
      isActive: [true]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submit(): void {
    if (this.jugadorForm.valid && this.selectedFile) {
      this.jugadoresService.createJugador(this.jugadorForm.value, this.selectedFile).subscribe({
        next: () => {
          this.snackBar.open('Jugador creado exitosamente', 'Cerrar', {duration: 3000});
          this.router.navigate(['/admin/jugadores']);
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Error al crear el jugador. Verifica los datos.';
          this.snackBar.open(errorMsg, 'Cerrar', {duration: 5000});
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {duration: 5000});
    }
  }
}
