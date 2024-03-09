import { View, Image, Text, ScrollView } from "react-native";
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
import Team from "../../components/Team";
import MEvent from "../../models/event/event";

const EventDetail = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { currentEvent, events } = useAppSelector(state => state.event);
    const { teams } = useAppSelector(state => state.team);
    const [selectedTeam, setSelectedTeam] = useState<SelectedItem>({
        text: '',
        selectedList: []
    });
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [event, setEvent] = useState<MEvent | undefined>(undefined);
    const { id } = route.params;

    useEffect(() => {
        getEvent();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getEvent();
        }, [])
    );

    const getEvent = () => {
        const findEvent = events.find(event => event.id === id);

        setEvent(findEvent);
        checkIfAlreadyRegistered();
    };

    const checkIfAlreadyRegistered = () => {
        const currentEventTeams = currentEvent?.eventTeams;
        
        currentEventTeams?.map(eventTeam => {
            if (teams.find(team => team.id === eventTeam.team_id)) {
                setAlreadyRegistered(true);
            };
        });
    };

    const handleOnSelectTeam = (selected: SelectedItem) => {
        setSelectedTeam(selected);
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
            {event &&
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Card style={commonStyles.card}>
                            <Card.Content style={[{ gap: 10 }]}>
                                <Image source={{ uri: event?.image }} resizeMode="cover" style={{ width: 'auto', height: 300 }}/>
                                <Text style={commonStyles.textBold}>{event?.name}</Text>
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
                                <Text style={[commonStyles.textBold, { marginTop: 10, fontSize: 16 }]}>Registrá tu equipo para poder inscribirte</Text>
                            }
                            <Button disabled={!!!selectedTeam.text} onPress={onSubmit}>INSCRIBIRSE</Button>
                            <Button onPress={() => navigation.goBack()} mode="elevated">VOLVER</Button>
                        </View>
                    }
                    {alreadyRegistered &&
                        <View style={{ gap: 10 }}>
                            <Text style={[commonStyles.textBold, { marginTop: 10, fontSize: 16 }]}>Ya estas inscripto a este evento</Text>
                            <Button onPress={() => navigation.goBack()} mode="elevated">VOLVER</Button>
                        </View>
                    }
                    <View style={{ gap: 10, paddingTop: 20 }}>
                        <Text style={[commonStyles.textBold, { fontSize: 16 }]}>EQUIPOS INSCRIPTOS</Text>
                        {event?.eventTeams.map(eventTeam => (
                            <Team team={eventTeam.team} key={eventTeam.id} readonly/>
                        ))}
                    </View>
                </ScrollView>
            }
        </View>
    );
};

export default EventDetail;