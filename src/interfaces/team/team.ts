import ITeamMember from "./member"

export default interface ITeam {
    id: number
    name: string
    mode_id: number
    members: ITeamMember[]
};