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
import {Equipo} from "../../../shared/models/equipo.models";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EquiposService} from "../../../core/services/equipos.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../manage-jugadores/confirm-dialog.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Location} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-manage-equipo',
  standalone: true,
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButtonToggle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderCellDef,
    FormsModule,
    MatCheckbox,
    MatIconButton,
    MatIcon,
    MatPaginator,
    MatHeaderRow,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatLabel,
    MatError
  ],
  templateUrl: './manage-equipo.component.html',
  styleUrl: './manage-equipo.component.css'
})
export class ManageEquipoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'liga', 'pais', 'acciones'];
  dataSource: MatTableDataSource<Equipo> = new MatTableDataSource();
  searchControl = new FormControl('');
  filterForm: FormGroup;
  totalEquipos: number = 0;
  pageSize: number = 12;
  pageIndex: number = 0;

  constructor(
    private equiposService: EquiposService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public location: Location,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.getEquipos();

    this.searchControl.valueChanges.subscribe(value => {
      this.pageIndex = 0;
      this.getEquipos(value ?? undefined);
    });

  }

  getEquipos(search?: string): void {
    this.equiposService.getEquipos(search, this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.results);
      this.totalEquipos = response.count;
    });
  }

  deleteEquipo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equiposService.deleteEquipo(id).subscribe({
          next: () => {
            this.snackBar.open('Equipo eliminado exitosamente', 'Cerrar', {duration: 5000});
            this.getEquipos();
          },
          error: err => {
            this.snackBar.open('Error al eliminar el equipo', 'Cerrar', {duration: 5000});
            console.error(err);
          }
        });
      }
    });
  }

  editEquipo(id: number): void {
    this.router.navigate(['/admin/equipos/edit', id]);
  }

  viewEquipo(id: number): void {
    this.router.navigate(['/admin/equipos/view', id]);
  }

  createEquipo(): void {
    this.router.navigate(['/admin/equipos/create']);
  }

  limpiarFiltros(): void {
    this.filterForm.reset();
    this.searchControl.reset();
    this.pageIndex = 0;
    this.getEquipos();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEquipos(this.searchControl.value ?? undefined);
  }

  goBack(): void {
    this.location.back();
  }
}
