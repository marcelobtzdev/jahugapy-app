import ITeam from "../team/team"

export default interface IEventScore {
    id: number
    event_id: number
    team_id: number
    date_number: number
    match_number: number
    kills: number
    kills_image: string
    position: number
    position_image: string
};