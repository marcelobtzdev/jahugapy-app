import ITeam from "../../interfaces/team/team";
import MTeamMember from "./member";

export default class MTeam {
    public id: number;
    public name: string;
    public mode_id: number;
    public members: MTeamMember[];

    constructor(team: ITeam) {
        this.id = team.id;
        this.name = team.name;
        this.mode_id = team.mode_id;
        this.members = team.members.map(member => new MTeamMember(member));
    }
}
