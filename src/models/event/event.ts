import IEvent from "../../interfaces/event/event";
import MEventScore from "./eventScore";
import MEventTeam from "./eventTeam";

export default class MEvent {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public status: boolean;
    public datesQuantity: number;
    public matchsQuantity: number;
    public currentDate: number;
    public eventTeams: MEventTeam[];
    public eventScores: MEventScore[];
    public registrationStatus: boolean;

    constructor(event: IEvent) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.image = event.image;
        this.status = event.status;
        this.datesQuantity = event.dates_quantity;
        this.matchsQuantity = event.matchs_quantity;
        this.currentDate = event.current_date;
        this.eventTeams = event.event_teams.map(eventTeam => new MEventTeam(eventTeam));
        this.eventScores = event.event_scores.map(eventScore => new MEventScore(eventScore));
        this.registrationStatus = event.registration_status;
    }
}
