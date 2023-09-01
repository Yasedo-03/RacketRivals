export interface User {
  email: string;
  first_name: string;
  last_name: string;
  club: string;
}

export interface UserResponse {
  userID: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
