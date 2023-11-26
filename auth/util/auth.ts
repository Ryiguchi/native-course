import axios from 'axios';

export async function authenticate(
  mode: string,
  email: string,
  password: string
) {
  const url = `${process.env.EXPO_PUBLIC_URL?.replace('<MODE>', mode)}${
    process.env.EXPO_PUBLIC_FIREBASE_KEY
  }`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  console.log(response.data);

  const token = response.data.idToken;

  return token;
}

export function createUser(email: string, password: string) {
  return authenticate('signUp', email, password);
}

export function loginUser(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}

export async function getMessage(token: string) {
  const url = `${process.env.EXPO_PUBLIC_FB_URL}/message.json?auth=${token}`;
  const response = await axios.get(url);

  return response.data;
}
