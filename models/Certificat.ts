import { Test } from "./test";
import { User } from "./user";

export interface Certificat {
    idCertificat: number;
    userId?: User;
    testId?: Test ;
  }
  