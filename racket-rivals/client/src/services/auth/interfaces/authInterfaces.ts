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
  firstName: string;
  lastName: string;
  club?: string;
  rank?: string;
  password: string;
}
