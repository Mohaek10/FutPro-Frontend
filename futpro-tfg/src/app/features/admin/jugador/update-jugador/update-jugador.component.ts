import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Equipo} from "../../../../shared/models/equipo.models";
import {map, Observable, startWith} from "rxjs";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {EquiposService} from "../../../../core/services/equipos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-update-jugador',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    MatSelect,
    NgIf,
    MatCheckbox,
    NgForOf,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './update-jugador.component.html',
  styleUrl: './update-jugador.component.css'
})
export class UpdateJugadorComponent implements OnInit {
  jugadorForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  equipos: Equipo[] = [];
  filteredEquipos: Observable<Equipo[]> = new Observable<Equipo[]>();
  jugadorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.jugadorForm = this.fb.group({
      id: [{value: '', disabled: true}],
      nombreCompleto: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(100), integerValidator]],
      equipo: [null, Validators.required],
      equipoId: [{value: '', disabled: true}],
      media: ['', [Validators.required, Validators.min(0), Validators.max(100), integerValidator]],
      rareza: ['', Validators.required],
      imagen: [null],
      valor: ['', [Validators.required, Validators.min(0)]],
      posicion: ['', Validators.required],
      en_mercado: [true],
      isActive: [true],
      createdAt: [{value: '', disabled: true}],
      updatedAt: [{value: '', disabled: true}]
    });
  }

  ngOnInit(): void {
    this.jugadorId = this.route.snapshot.params['id'];
    this.jugadoresService.getJugador(this.jugadorId!).subscribe(jugador => {
      this.jugadorForm.patchValue({
        id: jugador.id,
        nombreCompleto: jugador.nombreCompleto,
        edad: jugador.edad,
        equipo: jugador.equipo,
        equipoId: jugador.equipo,
        media: jugador.media,
        rareza: jugador.rareza,
        valor: jugador.valor,
        posicion: jugador.posicion,
        en_mercado: jugador.en_mercado,
        isActive: jugador.isActive,
        createdAt: jugador.createdAt,
        updatedAt: jugador.updatedAt
      });
      this.imagePreview = jugador.imagen;
    });

    this.equiposService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data.results;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los equipos. Intenta de nuevo.' + err, 'Cerrar', {duration: 5000});
      }
    });

    this.filteredEquipos = this.jugadorForm.get('equipo')!.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.nombre)),
      map(nombre => (nombre ? this._filterEquipos(nombre) : this.equipos.slice()))
    );
  }

  private _filterEquipos(nombre: string): Equipo[] {
    const filterValue = nombre.toLowerCase();
    return this.equipos.filter(equipo => equipo.nombre.toLowerCase().includes(filterValue));
  }

  displayFn(equipo: Equipo): string {
    return equipo && equipo.nombre ? equipo.nombre : '';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] || null;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.jugadorForm.patchValue({imagen: this.selectedFile});
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submit(): void {
    if (this.jugadorForm.valid) {
      const jugador = this.jugadorForm.getRawValue();
      jugador.equipo = jugador.equipo.id;

      this.jugadoresService.updateJugador(this.jugadorId!, jugador, this.selectedFile).subscribe({
        next: () => {
          this.snackBar.open('Jugador actualizado exitosamente', 'Cerrar', {duration: 3000});
          this.router.navigate(['/admin/jugadores']);
        },
        error: (err) => {
          const errorMsg = this.parseErrorMessages(err);
          this.snackBar.open(errorMsg, 'Cerrar', {duration: 5000});
        }
      });
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', {duration: 5000});
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
    return 'Error al actualizar el jugador. Verifica los datos.';
  }


}

function integerValidator(control: FormControl) {
  const value = control.value;
  if (value != null && (value % 1 !== 0)) {
    return {'notInteger': true};
  }
  return null;
}
