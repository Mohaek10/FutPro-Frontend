import {Component, OnInit} from '@angular/core';
import {Jugador} from "../../../shared/models/jugador.models";
import {FormControl, FormGroup} from "@angular/forms";
import {JugadoresService} from "../../../core/services/jugadores.service";
import {MercadoService} from "../../../core/services/mercado.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-mercado-sis',
  standalone: true,
  imports: [],
  templateUrl: './mercado-sis.component.html',
  styleUrl: './mercado-sis.component.css'
})
export class MercadoSisComponent implements OnInit {
  jugadores: Jugador[] = [];
  searchControl = new FormControl('');
  filterForm: FormGroup;
  totalJugadores: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;

  constructor(private mercadoService: MercadoService) {
    this.filterForm = new FormGroup({
      equipo: new FormControl(''),
      rareza: new FormControl(''),
      posicion: new FormControl(''),
      valorMin: new FormControl(''),
      valorMax: new FormControl(''),
      ordering: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  getMercadoSisList(search?: string, filters?: any): void {
    this.mercadoService.getJugadoresMercadoSistema(search, filters, this.pageIndex, this.pageSize).subscribe(data => {
      this.jugadores = data.results;
      this.totalJugadores = data.count;
    });
  }

  limpiarFiltros(): void {
    this.filterForm.reset();
    this.searchControl.reset();
    this.pageIndex = 0;
    this.getMercadoSisList();

  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMercadoSisList(this.searchControl.value ?? undefined, this.filterForm.value);
  }


}
