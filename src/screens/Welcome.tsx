import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../hooks/redux";
import { useEffect } from "react";

const Welcome = () => {
    const navigation = useNavigation();
    const { registeredUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (registeredUser) {
            navigation.navigate('Validation');
        }
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ed0f34' }}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/logo.png')} style={styles.img} resizeMode="contain"/>
                </View>
                <View style={styles.footerContainer}>
                    <View style={{ gap: 10 }}>
                        <Button onPress={() => navigation.navigate('Register')}>REGISTRARME</Button>
                        <Button mode="elevated" onPress={() => navigation.navigate('Login')}>INGRESAR</Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    logoContainer: {
        alignItems: 'center'
    },
    footerContainer: {
        gap: 10
    },
    img: {
        width: 250
    }
});

export default Welcome;