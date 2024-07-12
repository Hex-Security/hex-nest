import { RolesEnum } from '../enum/roles.enum';

export interface UserInterface {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date?: Date;
  role: RolesEnum;
  phone?: string;
  active: boolean;
  vehicles: any[];
  data: {
    user: {
      houses: any[];
      vehicles: any[];
    };
    guard: {
      complexes: any[];
      schedule: {
        day: string;
        start: Date;
        end: Date;
        complex_id: string;
        access_point: string;
      }[];
    };
    admin: {
      complexes: any[];
    };
  };
}