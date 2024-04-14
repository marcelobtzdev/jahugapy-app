import IEventScore from "../../interfaces/event/eventScore";

export default class MEventScore {
    public id: number;
    public event_id: number;
    public team_id: number;
    public date_number: number;
    public match_number: number;
    public kills: number;
    public kills_image: string;
    public position: number;
    public position_image: string;

    constructor(eventTeam: IEventScore) {
        this.id = eventTeam.id;
        this.event_id = eventTeam.event_id;
        this.team_id = eventTeam.team_id;
        this.date_number = eventTeam.date_number;
        this.match_number = eventTeam.match_number;
        this.kills = eventTeam.kills;
        this.kills_image = eventTeam.kills_image;
        this.position = eventTeam.position;
        this.position_image = eventTeam.position_image;
    }
}
