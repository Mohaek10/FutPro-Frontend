import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {JugadoresService} from "../../../../core/services/jugadores.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {EquiposService} from "../../../../core/services/equipos.service";
import {Equipo} from "../../../../shared/models/equipo.models";
import {map, Observable, startWith} from "rxjs";

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
    NgIf,
    MatAutocomplete,
    MatAutocompleteTrigger,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './create-jugador.component.html',
  styleUrl: './create-jugador.component.css'
})
export class CreateJugadorComponent implements OnInit {
  jugadorForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  equipos: Equipo[] = [];
  filteredEquipos: Observable<Equipo[]> = new Observable<Equipo[]>();


  constructor(
    private fb: FormBuilder,
    private jugadoresService: JugadoresService,
    private equiposService: EquiposService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.jugadorForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, NoWhitespaceValidator()]],
      // Se deja asi para comprobar error del servidor, edad maxima deberia de ser 200
      edad: ['', [Validators.required, Validators.min(0), Validators.max(200), integerValidator]],
      equipo: [null, Validators.required], // Cambiado a null
      media: ['', [Validators.required, Validators.min(0), Validators.max(100), integerValidator]],
      rareza: ['', Validators.required],
      imagen: [null, Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      posicion: ['', Validators.required],
      en_mercado: [true],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.equiposService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data.results;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los equipos. Intenta de nuevo.' + err, 'Cerrar', {duration: 5000});
      }
    });

    if (this.jugadorForm && this.jugadorForm.get('equipo')) {
      // @ts-ignore
      this.filteredEquipos = this.jugadorForm.get('equipo').valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => nombre ? this._filterEquipos(nombre) : this.equipos.slice()),
        );
    }

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
    if (this.jugadorForm.valid && this.selectedFile) {
      const jugador = this.jugadorForm.value;
      jugador.equipo = jugador.equipo.id;
      this.jugadoresService.createJugador(jugador, this.selectedFile).subscribe({
        next: () => {
          this.snackBar.open('Jugador creado exitosamente', 'Cerrar', {duration: 3000});
          this.router.navigate(['/admin/jugadores']);
        },
        error: (err) => {
          const errorMessages = this.parseErrorMessages(err);
          this.snackBar.open(errorMessages, 'Cerrar', {duration: 5000});
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
    return 'Error al crear el jugador. Verifica los datos.';
  }
}

function integerValidator(control: FormControl) {
  const value = control.value;
  if (value != null && (value % 1 !== 0)) {
    return {'notInteger': true};
  }
  return null;
}

export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  };
}
