import IUser from "../interfaces/user/user";

export class MUser {
    public id: number;
    public username: string;
    public activisionId: string;
    public phone: string;
    public role: 'user' | 'admin';

    constructor(user: IUser) {
        this.id = user.id;
        this.username = user.username;
        this.activisionId = user.activision_id;
        this.phone = user.phone;
        this.role = user.role;
    }
}
