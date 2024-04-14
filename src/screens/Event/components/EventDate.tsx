import { View, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import commonStyles from "../../../styles/common";
import Button from "../../../components/Button";
import useTeam from "../../../hooks/team";
import MEvent from "../../../models/event/event";
import { useNavigation } from "@react-navigation/native";
import useScore from "../../../hooks/score";
import { useEffect, useState } from "react";
import MTeam from "../../../models/team/team";
import MEventScore from "../../../models/event/eventScore";
import { setCurrentScore } from "../../../store/reducers/event";
import { useAppDispatch } from "../../../hooks/redux";

interface IEventDateProps {
    event: MEvent
    dateNumber: number
    matchsNumber: number
    currentDate: number
}

interface IMatchProps {
    event: MEvent
    dateNumber: number
    currentDate: number
    matchNumber: number
}

const Match = ({ event, dateNumber, currentDate, matchNumber }: IMatchProps) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const { getRegisteredUserTeam } = useTeam();
    const { getScore } = useScore();
    const [registeredTeam, setRegisteredTeam] = useState<MTeam | undefined>(undefined);
    const [score, setScore] = useState<MEventScore | null>(null);
    
    useEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        const team = await getRegisteredUserTeam(event.id);

        setRegisteredTeam(team);
        setScore(getScore(event, team?.id!, dateNumber, matchNumber));
    };

    const handleOnReport = () => {
        if (score) {
            dispatch(setCurrentScore(score));    
        } else {
            dispatch(setCurrentScore(undefined));    
        };

        navigation.push('AddEditEventScore', {
            teamId: registeredTeam?.id,
            dateNumber,
            matchNumber
        });
    };

    return (
        <View style={{ gap: 10, alignItems: 'center', borderWidth: 1, borderRadius: 6, borderColor: '#ddd', padding: 15 }}>
            <Text style={[commonStyles.textBold, { fontSize: 16 }]}>Partida {matchNumber}</Text>
            <View>
                {score && (
                    <View style={{ gap: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[commonStyles.text, { fontSize: 16 }]}>Posición: </Text>
                            <Text style={[commonStyles.text, { fontSize: 16 }]}>{score.position}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[commonStyles.text, { fontSize: 16 }]}>Kills: </Text>
                            <Text style={[commonStyles.text, { fontSize: 16 }]}>{score.kills}</Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.action}>
                    <Button onPress={handleOnReport} disabled={dateNumber !== currentDate}>{score ? 'ACTUALIZAR REPORTE' : 'REPORTAR'}</Button>
                </View>
            </View>
        </View>
    );
};

const EventDate = ({ event, dateNumber, matchsNumber, currentDate }: IEventDateProps) => {
    return (
        <View>
            <Card style={commonStyles.card}>
                <Card.Content style={[{ gap: 10 }]}>
                    <View style={{ gap: 10 }}>
                        <Text style={commonStyles.textBold}>FECHA {dateNumber}</Text>
                        <View style={{ gap: 10 }}>
                            {[...Array(matchsNumber)].map((value, i) => (
                                <Match event={event} dateNumber={dateNumber} currentDate={currentDate} matchNumber={i+1} key={i}/>
                            ))}
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 10
    },
    action: {
        flex: 1
    },
    list: {
        backgroundColor: '#fff'
    },
    listText: {
        color: '#111',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'uppercase'
    },
    listItemText: {
        color: '#666',
        fontFamily: 'Montserrat-SemiBold'
    }
});

export default EventDate;