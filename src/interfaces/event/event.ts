import IEventTeam from "./eventTeam"

export default interface IEvent {
    id: number
    name: string
    description: string
    image: string
    status: boolean
    event_teams: IEventTeam[]
}