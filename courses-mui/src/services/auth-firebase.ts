import AuthService from "./auth-service";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { authState } from "rxfire/auth";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { collectionData } from 'rxfire/firestore';
import { LoginData } from "../models/common/login-data";
import { nonAuthorizedUser, UserData } from "../models/common/user-data";
import appFire from "../config/fire-config";
import { collection, CollectionReference, getFirestore } from "firebase/firestore";

export default class AuthServiceFire implements AuthService {

    private authFire = getAuth(appFire);
    private fireCol: CollectionReference;

    constructor(adminColName: string) {
        const db = getFirestore(appFire);
        this.fireCol = collection(db, adminColName);
    }

    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(
            switchMap(user => collectionData(this.fireCol).pipe(
                map(admins => (
                    !!user
                        ? {
                            userName: user.uid,
                            displayedName: user.displayName || user.email as string,
                            isAdmin: !!admins.find(a => user.email === a.email)
                        }
                        : nonAuthorizedUser
                ))
            ))
        )
    }

    login(loginData: LoginData): Promise<boolean> {
        return !!loginData.provider
            ? signInWithPopup(this.authFire, loginData.provider!)
                .then(() => true)
                .catch(() => false)
            : signInWithEmailAndPassword(this.authFire, loginData.email!, loginData.password!)
                .then(() => true)
                .catch(() => false);
    }

    logout(): Promise<boolean> {
        return signOut(this.authFire)
            .then(() => true)
            .catch(() => false);
    }
}