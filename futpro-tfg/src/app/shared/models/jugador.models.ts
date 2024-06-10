import {Comentario} from "./comentario.models";

export interface Jugador {
  id: number;
  nombreCompleto: string;
  edad: number;
  media: number;
  rareza: string;
  imagen: string;
  valor: number;
  posicion: string;
  createdAt: string;
  en_mercado: boolean;
  isActive: boolean;
  nombre_equipo: string;
  equipo: number;
  escudo: string;
  comentarios: Comentario[];
  cantidad: number;
  id_usuario_jugador: number;
}
