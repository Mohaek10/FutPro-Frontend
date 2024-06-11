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
import {Jugador} from "../../../shared/models/jugador.models";
import {JugadoresService} from "../../../core/services/jugadores.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-manage-jugadores',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatButtonToggle,
    MatOption,
    MatPaginator
  ],
  templateUrl: './manage-jugadores.component.html',
  styleUrl: './manage-jugadores.component.css'
})
export class ManageJugadoresComponent implements OnInit {
  displayedColumns: string[] = ['nombreCompleto', 'equipo', 'edad', 'media', 'rareza', 'posicion', 'acciones'];
  dataSource: MatTableDataSource<Jugador> = new MatTableDataSource();
  searchControl = new FormControl('');
  filterForm: FormGroup;
  totalJugadores: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;

  constructor(
    private jugadoresService: JugadoresService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
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
      this.dataSource = new MatTableDataSource(response.results);
      this.totalJugadores = response.count;
      console.log(this.dataSource);
    });
  }

  deleteJugador(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      this.jugadoresService.deleteJugador(id).subscribe(() => {
        this.snackBar.open('Jugador eliminado exitosamente', 'Cerrar', {duration: 3000});
        this.getJugadores();
      });
    }
  }

  editJugador(id: number): void {
    this.router.navigate(['/admin/jugadores/edit', id]);
  }

  viewJugador(id: number): void {
    this.router.navigate(['/admin/jugadores/view', id]);
  }

  createJugador(): void {
    this.router.navigate(['/admin/jugadores/create']);
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
