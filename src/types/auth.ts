import { User } from "../../types";

export interface ResetPasswordRequestData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  user:  User;
  success: boolean;
}
