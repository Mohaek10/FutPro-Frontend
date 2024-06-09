export interface Equipo {
  id: number;
  nombre: string;
  liga: string;
  createdAt: string;
  isActive: boolean;
  jugadores: number[];
  escudo: string;
}
