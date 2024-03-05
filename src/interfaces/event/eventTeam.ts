import ITeam from "../team/team"

export default interface IEventTeam {
    id: number
    event_id: number
    team_id: number
    active: boolean
    team?: ITeam
};