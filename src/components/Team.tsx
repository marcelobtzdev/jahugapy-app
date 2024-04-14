import { Card, List } from "react-native-paper";
import Button from "../components/Button";
import { useState } from "react";
import { StyleSheet, View } from 'react-native';
import commonStyles from "../styles/common";
import MTeam from "../models/team/team";
import { setCurrentTeam } from "../store/reducers/team";
import { useAppDispatch } from "../hooks/redux";
import { useNavigation } from "@react-navigation/native";
import { deleteTeamAction } from "../store/actions/team";
import { unwrapResult } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { displayErrors } from "../utils/common";

interface IProps {
    team: MTeam,
    readonly?: boolean
};

const Team = ({ team, readonly = false }: IProps) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState(true);

    const handlePress = () => setExpanded(!expanded);

    const handleEditTeam = (team: MTeam) => {
        dispatch(setCurrentTeam(team));

        navigation.navigate('AddEditTeam');
    };

    const handleDeleteTeam = async (teamId: number) => {
        try {
            await dispatch(deleteTeamAction(teamId)).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Equipo eliminado correctamente.' });
        } catch (error) {
            displayErrors(error);
            
            console.log('DELETE TEAM ERROR', error)
        };
    };

    return (
        <View style={styles.container}>
            <Card style={commonStyles.card}>
                <Card.Content style={[{ gap: 10 }]}>
                    <List.Accordion
                        title={team.name}
                        left={props => <List.Icon {...props} icon="account-group" />}
                        expanded={expanded}
                        onPress={handlePress}
                        style={styles.list}
                        titleStyle={styles.listText}
                    >
                        {team.members.map(member => (
                            <List.Item title={member.user.activisionId} titleStyle={styles.listItemText} key={member.id}/>
                        ))}
                    </List.Accordion>
                    {!readonly &&
                        <View style={styles.actionsContainer}>
                            <View style={styles.action}>
                                <Button mode="elevated" onPress={() => handleDeleteTeam(team.id)} disabled>Eliminar</Button>
                            </View>
                            <View style={styles.action}>
                                <Button onPress={() => handleEditTeam(team)} disabled>Editar</Button>
                            </View>
                        </View>
                    }
                </Card.Content>
            </Card>
        </View>
    )
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

export default Team;