import ITeamMember from "../../interfaces/team/member";
import { MUser } from "../user";

export default class MTeamMember {
    public id: number;
    public user: MUser;

    constructor(member: ITeamMember) {
        this.id = member.id;
        this.user = new MUser(member.user);
    }
};