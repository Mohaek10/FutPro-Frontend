import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MercadoService} from "../../../core/services/mercado.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {JugadorComponent} from "../../../shared/components/jugador/jugador.component";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormatoNumeroPipe} from "../../../shared/pipes/formato-numero.pipe";
import {Jugador} from "../../../shared/models/jugador.models";
import {CompraUserDialogComponent} from "../compra-user-dialog/compra-user-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-mercado-use',
  standalone: true,
  imports: [
    JugadorComponent,
    MatButtonToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatPaginator,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FormatoNumeroPipe,
    DatePipe
  ],
  templateUrl: './mercado-use.component.html',
  styleUrl: './mercado-use.component.css'
})
export class MercadoUseComponent implements OnInit {
  jugadoresEnVenta: any[] = [];
  searchControl = new FormControl('');
  filterForm: FormGroup;
  totalJugadores: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;

  constructor(private mercadoService: MercadoService, private dialog: MatDialog, private auhtService: AuthService) {
    this.filterForm = new FormGroup({
      equipo: new FormControl(''),
      rareza: new FormControl(''),
      posicion: new FormControl(''),
      valor_min: new FormControl(''),
      valor_max: new FormControl(''),
      ordering: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getMercadoUserList();

    this.searchControl.valueChanges.subscribe(value => {
      this.pageIndex = 0;
      this.getMercadoUserList(value ?? undefined, this.filterForm.value);
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.pageIndex = 0;
      this.getMercadoUserList(this.searchControl.value ?? undefined, value);
    });
  }

  openCompraDialog(jugador: Jugador, ventaId: number, precio: number, cantidad: number): void {
    const dialogRef = this.dialog.open(CompraUserDialogComponent, {
      width: '600px',
      data: {jugador, ventaId, precio, cantidad}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        console.log('Compra realizada exitosamente');
        this.getMercadoUserList();
        this.auhtService.updateUser()
      }
    });
  }

  getMercadoUserList(search?: string, filters?: any): void {
    this.mercadoService.getMercadoUsuario(search, filters, this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.jugadoresEnVenta = response.results;
      this.totalJugadores = response.count;
    });
  }

  limpiarFiltros(): void {
    this.filterForm.reset();
    this.searchControl.reset();
    this.pageIndex = 0;
    this.getMercadoUserList();

  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMercadoUserList(this.searchControl.value ?? undefined, this.filterForm.value);
  }

}
