import IEventScore from "./eventScore"
import IEventTeam from "./eventTeam"

export default interface IEvent {
    id: number
    name: string
    description: string
    image: string
    status: boolean
    dates_quantity: number
    matchs_quantity: number
    current_date: number
    event_teams: IEventTeam[]
    event_scores: IEventScore[]
    registration_status: boolean
}