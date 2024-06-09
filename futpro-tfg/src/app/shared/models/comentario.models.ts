export interface Comentario {
  id: number;
  comentario_user: string;
  calificacion: number;
  texto: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  jugador: number;
}
