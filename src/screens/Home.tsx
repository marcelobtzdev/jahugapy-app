import { View } from "react-native";
import commonStyles from "../styles/common";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useCallback, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { getEventsAction } from "../store/actions/event";
import { displayErrors } from "../utils/common";
import Event from "../components/Event";

const Home = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { events } = useAppSelector(state => state.event);

    useEffect(() => {
        getEvents();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getEvents();
        }, [])
    );

    const getEvents = async (): Promise<void> => {
        try {
            await dispatch(getEventsAction()).then(unwrapResult);
        } catch (error) {
            displayErrors(error);
          
            console.log('GET EVENTS ERROR', error)
        };
    };

    return (
        <View style={commonStyles.container}>
            {events.map(event => (
                <Event event={event} key={event.id}/>
            ))}
        </View>
    );
};

export default Home;