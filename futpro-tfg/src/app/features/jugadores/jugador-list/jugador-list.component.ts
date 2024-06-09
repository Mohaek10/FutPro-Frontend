import {Component, OnInit} from '@angular/core';
import {Jugador} from "../../../shared/models/jugador.models";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JugadoresService} from '../../../core/services/jugadores.service';
import {NgForOf} from "@angular/common";
import {JugadorComponent} from "../../../shared/components/jugador/jugador.component";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-jugador-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    JugadorComponent,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.css'
})
export class JugadorListComponent implements OnInit {
  jugadores: Jugador[] = [];
  searchControl = new FormControl('');
  filterForm: FormGroup;

  constructor(private jugadoresService: JugadoresService) {
    this.filterForm = new FormGroup({
      equipo: new FormControl(''),
      rareza: new FormControl(''),
      posicion: new FormControl(''),
      valorMin: new FormControl(''),
      valorMax: new FormControl(''),
      orderBy: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getJugadores();

    this.searchControl.valueChanges.subscribe(value => {
      this.getJugadores(value ?? undefined, this.filterForm.value);
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.getJugadores(this.searchControl.value ?? undefined, value);
    });
  }

  getJugadores(search?: string, filters?: any): void {
    const filterParams = filters ? {
      ...filters,
      valor_min: filters.valorMin ?? 0,
      valor_max: filters.valorMax ?? 1000000000000,
      ordering: filters.orderBy ?? ''
    } : {};

    this.jugadoresService.getJugadores(search, filterParams).subscribe(response => {
      this.jugadores = response.results;
      console.log(this.jugadores);
    });
  }

}
