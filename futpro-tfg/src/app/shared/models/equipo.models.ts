export interface Equipo {
  id: number;
  nombre: string;
  liga: string;
  pais: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  jugadores: number[];
  escudo: string;
}
