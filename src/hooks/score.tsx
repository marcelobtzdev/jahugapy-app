import MEvent from "../models/event/event";

const useScore = () => {
    const getScore = (event: MEvent, teamId: number, dateNumber: number, matchNumber: number) => {
        const eventScores = event.eventScores;
        const teamScores = eventScores.filter(eventScore => eventScore.team_id === teamId);

        if (teamScores) {
            const score = teamScores.find(teamScore => teamScore.date_number === dateNumber && teamScore.match_number === matchNumber);

            return score ?? null;
        };

        return null;
    };

    return {
        getScore
    };
};

export default useScore;