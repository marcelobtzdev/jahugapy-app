export default interface IAddUpdateTeam {
    name: string
    mode_id: number
    members: IAddEditTeamMember[]
};

interface IAddEditTeamMember {
    activision_id: string
};