import { useAppSelector } from "./redux";

const useTeam = () => {
    const { events } = useAppSelector(state => state.event);
    const { teams } = useAppSelector(state => state.team);
    
    const getRegisteredUserTeam = async (eventId: number) => {
        const findEvent = events.find(event => event.id === eventId);
        const eventTeams = findEvent?.eventTeams;
        const teamIds = teams.map(team => team.id);

        return eventTeams?.find(eventTeam => teamIds.includes(eventTeam.team.id))?.team
    };

    return {
        getRegisteredUserTeam
    };
};

export default useTeam;