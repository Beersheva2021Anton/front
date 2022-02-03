import { AuthProvider } from "firebase/auth";

export type LoginData = {
    email?: string,
    password?: string,
    provider?: AuthProvider
}