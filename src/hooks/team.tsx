import { unwrapResult } from "@reduxjs/toolkit";
import { getTeamsAction } from "../store/actions/team";
import { useAppDispatch, useAppSelector } from "./redux";
import { displayErrors } from "../utils/common";

const useTeam = () => {
    const dispatch = useAppDispatch();
    const { events } = useAppSelector(state => state.event);
    const { teams } = useAppSelector(state => state.team);

    const getTeams = async (): Promise<void> => {
        try {
            await dispatch(getTeamsAction()).then(unwrapResult);
        } catch (error) {
            displayErrors(error);
          
            console.log('GET TEAMS ERROR', error)
        };
    };
    
    const getRegisteredUserTeam = async (eventId: number) => {
        const findEvent = events.find(event => event.id === eventId);
        const eventTeams = findEvent?.eventTeams;
        const teamIds = teams.map(team => team.id);

        return eventTeams?.find(eventTeam => teamIds.includes(eventTeam.team.id))?.team
    };

    return {
        getTeams,
        getRegisteredUserTeam
    };
};

export default useTeam;