export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  club?: string;
  rank?: string;
  password: string;
}
