import { View, Image, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import commonStyles from "../../styles/common";
import { Card } from "react-native-paper";
import Select from "../../components/Select";
import { SelectedItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import Button from "../../components/Button";
import { addEventTeamAction } from "../../store/actions/event";
import { displayErrors } from "../../utils/common";
import Toast from "react-native-toast-message";

const EventDetail = () => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { currentEvent } = useAppSelector(state => state.event);
    const { teams } = useAppSelector(state => state.team);
    const [selectedTeam, setSelectedTeam] = useState<SelectedItem>({
        text: '',
        selectedList: []
    });
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);

    useEffect(() => {
        checkIfAlreadyRegistered();
    }, []);

    useFocusEffect(
        useCallback(() => {
            checkIfAlreadyRegistered();
        }, [])
    );

    const handleOnSelectTeam = (selected: SelectedItem) => {
        setSelectedTeam(selected);
    };

    const checkIfAlreadyRegistered = () => {
        const currentEventTeams = currentEvent?.teams;

        currentEventTeams?.map(eventTeam => {
            if (teams.find(team => team.id === eventTeam.team_id)) {
                setAlreadyRegistered(true);
            };
        });
    };

    const onSubmit = async (): Promise<void> => {
        try {
            await dispatch(addEventTeamAction(selectedTeam.selectedList[0]._id)).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Registrado correctamente al evento.' });

            navigation.goBack();
        } catch (error) {
            displayErrors(error);
          
            console.log('ADD EVENT TEAM ERROR', error)
        };
    };

    return (
        <View style={commonStyles.container}>
            <View>
                <Card style={commonStyles.card}>
                    <Card.Content style={[{ gap: 10 }]}>
                        <Image source={{ uri: currentEvent?.image }} resizeMode="cover" style={{ width: 'auto', height: 300 }}/>
                        <Text style={commonStyles.textBold}>{currentEvent?.name}</Text>
                    </Card.Content>
                </Card>
            </View>
            {!alreadyRegistered &&
                <View style={{ gap: 10 }}>
                    {teams.length > 0 &&
                        <Select 
                            placeholder="Seleccionar equipo"
                            options={teams.map(team => ({ _id: String(team.id), value: team.name }))}
                            onSelect={handleOnSelectTeam}
                        />
                    }
                    {!teams.length &&
                        <Text style={commonStyles.text}>Registrá tu equipo para poder inscribirte</Text>
                    }
                    <Button disabled={!!!selectedTeam.text} onPress={onSubmit}>INSCRIBIRSE</Button>
                    <Button onPress={() => navigation.goBack()} mode="elevated">VOLVER</Button>
                </View>
            }
            {alreadyRegistered &&
                <View style={{ gap: 10 }}>
                    <Text style={commonStyles.text}>Ya estas inscripto a este evento</Text>
                    <Button onPress={() => navigation.goBack()} mode="elevated">VOLVER</Button>
                </View>
            }
        </View>
    );
};

export default EventDetail;