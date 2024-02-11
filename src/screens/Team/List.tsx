import { View, Text } from "react-native";
import Team from "../../components/Team";
import commonStyles from "../../styles/common";
import { displayErrors } from "../../utils/common";
import { getTeamsAction } from "../../store/actions/team";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCallback, useEffect } from "react";
import Button from "../../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const TeamList = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { teams } = useAppSelector(state => state.team);

    useEffect(() => {
        getTeams();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getTeams();
        }, [])
    );

    const getTeams = async (): Promise<void> => {
        try {
            await dispatch(getTeamsAction()).then(unwrapResult);
        } catch (error) {
            displayErrors(error);
          
            console.log('GET TEAMS ERROR', error)
        };
    };

    const handleAddTeam = () => {
        navigation.navigate('AddEditTeam');
    };

    return (
        <View style={commonStyles.container}>
            <View style={{ gap: 10 }}>
                <View>
                    <Button onPress={handleAddTeam}>AGREGAR</Button>
                </View>
                <View style={{ gap: 10 }}>
                    {teams.map(team => (
                        <Team team={team} key={team.id}/>
                    ))}
                </View>
                {!teams.length &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={commonStyles.text}>Todavía no tienes equipos registrados</Text>
                    </View>
                }
            </View>
        </View>
    );
};

export default TeamList;