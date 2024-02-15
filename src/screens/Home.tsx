import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import commonStyles from "../styles/common";
import { Card } from "react-native-paper";
import Button from "../components/Button";

const Home = () => {
    return (
        <View style={commonStyles.container}>
            <Card style={commonStyles.card}>
                <Card.Content style={[{ gap: 10 }]}>
                    <Image source={require('../../assets/liga-flyer.png')} resizeMode="cover" style={{ width: 'auto', height: 300 }}/>
                    <Text style={commonStyles.textBold}>LIGA WARZONE (Próximamente)</Text>
                    <Button disabled>INSCRIBIRSE</Button>
                </Card.Content>
            </Card>
        </View>
    );
};

export default Home;