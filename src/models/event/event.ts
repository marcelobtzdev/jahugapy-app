import IEvent from "../../interfaces/event/event";
import MEventTeam from "./eventTeam";

export default class MEvent {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public status: boolean;
    public eventTeams: MEventTeam[];

    constructor(event: IEvent) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.image = event.image;
        this.status = event.status;
        this.eventTeams = event.event_teams.map(eventTeam => new MEventTeam(eventTeam));
    }
}
