export {};

declare global {
  interface SignInInput {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
  }

  interface Credentials {
    email: string;
    password: string;
  }
}
