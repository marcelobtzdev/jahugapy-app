import MEvent from "../models/event/event";
import { useAppDispatch } from "./redux";
import { getEventsAction } from "../store/actions/event";
import { unwrapResult } from "@reduxjs/toolkit";

const useEvent = () => {
    const dispatch = useAppDispatch();
    
    const getEvents = async () => {
        await dispatch(getEventsAction()).then(unwrapResult);
    };

    const getEvent = async (events: MEvent[], eventId: number) => {
        const findEvent = events.find(event => event.id === eventId);

        return findEvent;
    };

    return {
        getEvents,
        getEvent
    };
};

export default useEvent;