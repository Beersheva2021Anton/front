import { LoginData } from "../models/common/login-data";
import { UserData } from "../models/common/user-data";
import { Observable } from "rxjs";
import AuthService from "./auth-service";
import { AUTH_TOKEN } from "./courses-service-rest";
import { nonAuthorizedUser } from "../models/common/user-data";

const pollingInterval = 3000;

export default class AuthServiceJwt implements AuthService {

    constructor(private url: string) {
    }

    private cache = '';

    getUserData(): Observable<UserData> {
        return new Observable<UserData>(subscriber => {
            try {
                let userData = fetchUserData();
                this.cache = JSON.stringify(userData);
                subscriber.next(userData);
                setInterval(() => {
                    userData = fetchUserData();
                    let userDataJson = JSON.stringify(userData);
                    if (userDataJson !== this.cache) {
                        this.cache = userDataJson;
                        subscriber.next(userData);
                    }
                }, pollingInterval);
            } catch (err) {
                subscriber.error(err);
            }
        })
    }

    async login(loginData: LoginData): Promise<boolean> {
        const response = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            const token = await response.json();
            localStorage.setItem(AUTH_TOKEN, token.accessToken);
        }
        return response.ok;
    }

    logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN);
        return Promise.resolve(true);
    }
}

function fetchUserData(): UserData {
    const token: string | null = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
        return nonAuthorizedUser;
    }
    return tokenToUserData(token);
}

function tokenToUserData(token: string): UserData {
    const rawPayload = token.split('.')[1]; // JSON in Base64
    const payLoad: any = JSON.parse(atob(rawPayload));
    if (payLoad.exp < (Date.now() / 1000)) {
        localStorage.removeItem(AUTH_TOKEN);
        return nonAuthorizedUser;
    }
    return {
        userName: payLoad.email,
        displayedName: payLoad.email,
        isAdmin: +payLoad.sub === 1
    }
}