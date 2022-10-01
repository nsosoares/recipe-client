export class User {
    constructor(
        public id: number,
        public name: string,
        public login: string,
        public password: string,
        public userType: UserType
    ) {}
}

export enum UserType {
    Admin,
    Chef
}