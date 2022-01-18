export type UserData = {
    userName: string;
    isAdmin: boolean;
    displayedName: string;
}

export const nonAuthorizedUser: UserData = {
    userName: '',
    isAdmin: false,
    displayedName: ''
}