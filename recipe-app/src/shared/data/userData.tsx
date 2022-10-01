import { ILoginForm } from "../../pages/login/login-form.model";
import { User, UserType } from "../models/user-model";

export class UserData {
    private static users: User[] = [
        new User(1, 'Admin', 'admin', '1234', UserType.Admin),
        new User(2, 'Chef', 'chef', '1234', UserType.Chef)
    ];

    public static getUsers(): User[] {
        return this.users;
    }

    public static addUser(user: User): void {
        this.users.push(user);
    }

    public static getUserForSignIn(userForm: ILoginForm) {
        return this.users.find(user => 
            user.login === userForm.login && user.password === userForm.password);
    }
}