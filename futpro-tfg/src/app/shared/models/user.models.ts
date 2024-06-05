export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  futcoins: number;
  date_joined: Date;
  is_admin: boolean;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
}
