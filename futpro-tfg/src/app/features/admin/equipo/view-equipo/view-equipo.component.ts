import {Component, OnInit} from '@angular/core';
import {Equipo} from "../../../../shared/models/equipo.models";
import {EquiposService} from "../../../../core/services/equipos.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-view-equipo',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './view-equipo.component.html',
  styleUrl: './view-equipo.component.css'
})
export class ViewEquipoComponent implements OnInit {
  equipo: Equipo | null = null;

  constructor(
    private equiposService: EquiposService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const equipoId = this.route.snapshot.params['id'];
    this.equiposService.getEquipo(equipoId).subscribe(equipo => {
      this.equipo = equipo;
    });
  }
}
