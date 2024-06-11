import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

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
    MatLabel
  ],
  templateUrl: './create-jugador.component.html',
  styleUrl: './create-jugador.component.css'
})
export class CreateJugadorComponent {

  jugadorForm: FormGroup;
  selectedFile: File | null = null;

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
  }

  submit(): void {
    if (this.jugadorForm.valid && this.selectedFile) {
      this.jugadoresService.createJugador(this.jugadorForm.value, this.selectedFile).subscribe(() => {
        this.snackBar.open('Jugador creado exitosamente', 'Cerrar', {duration: 3000});
        this.router.navigate(['/admin/jugadores']);
      });
    }
  }
}
