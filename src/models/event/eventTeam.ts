import IEventTeam from "../../interfaces/event/eventTeam";
import MTeam from "../team/team";

export default class MEventTeam {
    public id: number;
    public event_id: number;
    public team_id: number;
    public active: boolean;
    public team: MTeam;

    constructor(eventTeam: IEventTeam) {
        this.id = eventTeam.id;
        this.event_id = eventTeam.event_id;
        this.team_id = eventTeam.team_id;
        this.active = eventTeam.active;
        this.team = new MTeam(eventTeam.team);
    }
}
