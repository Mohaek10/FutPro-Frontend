import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EquiposService} from "../../../../core/services/equipos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Equipo} from "../../../../shared/models/equipo.models";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-update-equipo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatCheckbox,
    MatButton,
    MatLabel, MatError
  ],
  templateUrl: './update-equipo.component.html',
  styleUrl: './update-equipo.component.css'
})
export class UpdateEquipoComponent implements OnInit {
  equipoForm: FormGroup;
  equipoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private equiposService: EquiposService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.equipoForm = this.fb.group({
      nombre: ['', Validators.required],
      liga: ['', Validators.required],
      pais: ['', Validators.required],
      escudo: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.equipoId = this.route.snapshot.params['id'];
    this.equiposService.getEquipo(this.equipoId).subscribe(equipo => {
      this.equipoForm.patchValue(equipo);
    });
  }

  submit(): void {
    if (this.equipoForm.valid) {
      const equipo: Equipo = this.equipoForm.value;
      this.equiposService.updateEquipo(this.equipoId, equipo).subscribe({
        next: () => {
          this.snackBar.open('Equipo actualizado exitosamente', 'Cerrar', {duration: 3000});
          this.router.navigate(['/admin/equipos']);
        },
        error: (err) => {
          const errorMsg = err.error?.error || 'Error al actualizar el equipo. Verifica los datos.';
          this.snackBar.open(errorMsg, 'Cerrar', {duration: 5000});
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {duration: 5000});
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/equipos']);
  }
}
