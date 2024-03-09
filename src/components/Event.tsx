import { Card, Text } from "react-native-paper";
import MEvent from "../models/event/event";
import commonStyles from "../styles/common";
import { Image } from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../hooks/redux";
import { setCurrentEvent } from "../store/reducers/event";

interface IProps {
    event: MEvent
};

const Event = ({ event }: IProps) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    
    const handleGotToDetail = () => {
        // dispatch(setCurrentEvent(event));
        navigation.navigate('EventDetail', { id: event.id });
    };

    return (
        <Card style={commonStyles.card}>
            <Card.Content style={[{ gap: 10 }]}>
                <Image source={{ uri: event.image }} resizeMode="cover" style={{ width: 'auto', height: 300 }}/>
                <Text style={commonStyles.textBold}>{event.name}</Text>
                <Button onPress={handleGotToDetail}>VER EVENTO</Button>
            </Card.Content>
        </Card>
    )
};

export default Event;