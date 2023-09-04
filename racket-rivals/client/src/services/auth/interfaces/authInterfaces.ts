export interface UserResponse {
  userID: string;
  accessToken: string;
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
