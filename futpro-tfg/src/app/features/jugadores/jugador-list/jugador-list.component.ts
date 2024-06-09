import {Component, OnInit} from '@angular/core';
import {Jugador} from "../../../shared/models/jugador.models";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JugadoresService} from '../../../core/services/jugadores.service';
import {NgForOf, NgIf} from "@angular/common";
import {JugadorComponent} from "../../../shared/components/jugador/jugador.component";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";

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
    MatOption,
    MatButton,
    MatButtonToggle,
    NgIf,
    MatPaginatorModule,
  ],
  templateUrl: './jugador-list.component.html',
  styleUrl: './jugador-list.component.css'
})
export class JugadorListComponent implements OnInit {
  jugadores: Jugador[] = [];
  searchControl = new FormControl('');
  filterForm: FormGroup;
  totalJugadores: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;

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
      this.pageIndex = 0;
      this.getJugadores(value ?? undefined, this.filterForm.value);
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.pageIndex = 0;
      this.getJugadores(this.searchControl.value ?? undefined, value);
    });
  }

  getJugadores(search?: string, filters?: any): void {
    this.jugadoresService.getJugadores(search, filters, this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.jugadores = response.results;
      this.totalJugadores = response.count;
      console.log(this.jugadores);
    });
  }

  limpiarFiltros(): void {
    this.filterForm.reset();
    this.searchControl.reset();
    this.pageIndex = 0;
    this.getJugadores();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getJugadores(this.searchControl.value ?? undefined, this.filterForm.value);
  }
}
