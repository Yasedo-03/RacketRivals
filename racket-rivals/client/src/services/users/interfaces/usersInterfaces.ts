export interface User {
  email: string;
  first_name: string;
  last_name: string;
  club: string;
  rank: string;
}

export interface UserResponse {
  userID: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  first_name: string;
  last_name: string;
  club: string;
  rank: string;
  password: string;
}
