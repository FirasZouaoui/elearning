

import { Formation } from "./formation";


export interface User {
  id: string;
  username: string;
  email: string;
  enrolledFormations?: Formation[];
}
