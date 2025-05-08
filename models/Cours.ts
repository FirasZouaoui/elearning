import { Formation } from "./formation";

export interface Cours {
  idCours: number;
  titre: string;
  youtubeLink: string;
  idFormation: number;
  formation?: Formation
}
