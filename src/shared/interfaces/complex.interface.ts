export interface ComplexInterface {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  contact_number: string;
  active: boolean;
  admin_ids: string[];
  guard_ids: string[];
  house_ids: string[];

  access_points: {
    name: string;
    location: string;
  }[];
}
