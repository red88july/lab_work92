export interface User {
  _id: string;
  username: string;
  displayName: string;
  token: string;
}

export interface RegistrationResponse {
  message: string;
  user: User;
}

export interface RegisterUser {
  username: string;
  displayName: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}