import { View, Text } from "react-native";
import commonStyles from "../styles/common";

const Stat = () => {
    return (
        <View style={commonStyles.container}>
            <View style={{  }}>
                <Text style={commonStyles.text}>Vamos a agregar esta funcionalidad más adelante. Podrás ver tu KD, kills, partidas ganadas y otras estadísticas interesantes.</Text>
            </View>
        </View>
    );
};

export default Stat;