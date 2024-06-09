import {Component, OnInit} from '@angular/core';
import {Jugador} from "../../../shared/models/jugador.models";
import {Comentario} from "../../../shared/models/comentario.models";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {JugadoresService} from "../../../core/services/jugadores.service";
import {AuthService} from "../../../core/services/auth.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormatoNumeroPipe} from "../../../shared/pipes/formato-numero.pipe";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {JugadorComponent} from "../../../shared/components/jugador/jugador.component";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-jugador-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe,
    CurrencyPipe,
    FormatoNumeroPipe,
    NgIf,
    NgForOf,
    MatFormField,
    JugadorComponent,
    MatInput,
    MatButton,
    MatCard,
    MatLabel,
    MatError
  ],
  templateUrl: './jugador-detail.component.html',
  styleUrl: './jugador-detail.component.css'
})
export class JugadorDetailComponent implements OnInit {
  jugador: Jugador | null = null;
  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;
  estaLogueado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jugadoresService: JugadoresService,
    private authService: AuthService
  ) {
    this.comentarioForm = new FormGroup({
      calificacion: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
      texto: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getJugadorDetails(+id);
    }
    this.estaLogueado = this.authService.isAuthenticated();

  }

  getJugadorDetails(id: number): void {
    this.jugadoresService.getJugador(id).subscribe(response => {
      this.jugador = response;
      this.comentarios = response.comentarios;
    });
  }

  onSubmitComentario(): void {
    if (this.comentarioForm.valid && this.jugador) {
      const comentarioData = {...this.comentarioForm.value, jugador: this.jugador.id};
      this.jugadoresService.createComentario(this.jugador.id, comentarioData).subscribe(response => {
        this.comentarios.push(response);
        this.comentarioForm.reset();
      });
    }
  }

}
