import { PersonaACargo } from './personaACargo';

export interface Usuario {
  nombre: string;
  apellido: string;
  edad: number;
  pais: string;
  ciudad: string;
  personaACargo: PersonaACargo[];
}
