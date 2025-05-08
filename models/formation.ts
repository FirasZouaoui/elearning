import { User } from "./user";


export interface Formation {
  idFormation: number;
  nom: string;
  description: string;
  duree: number;
  imageUrl?: string;
  users?: User[];
}
