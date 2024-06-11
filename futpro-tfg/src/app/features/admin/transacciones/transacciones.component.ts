import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MercadoService} from "../../../core/services/mercado.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatTable,
    ReactiveFormsModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatPaginator,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    DatePipe,
    MatRowDef,
    MatLabel
  ],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit {
  displayedColumns: string[] = ['comprador_username', 'vendedor_username', 'jugador_nombre', 'cantidad', 'precio', 'fecha'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  searchControl = new FormControl('');
  totalTransacciones: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private mercadoService: MercadoService,
  ) {
  }

  ngOnInit(): void {
    this.getTransacciones();

    this.searchControl.valueChanges.subscribe(value => {
      this.pageIndex = 0;
      this.getTransacciones(value ?? undefined);
    });
  }

  getTransacciones(search?: string): void {
    this.mercadoService.getTransacciones(search, this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.results);
      this.totalTransacciones = response.count;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getTransacciones(this.searchControl.value ?? undefined);
  }

  goBack(): void {
    window.history.back();
  }
}
