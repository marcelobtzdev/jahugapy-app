import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, HelperText } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import Button from "../../components/Button";
import ILogin from "../../interfaces/login";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { unwrapResult } from "@reduxjs/toolkit";
import { loginAction } from "../../store/actions/user";
import { displayErrors } from "../../utils/common";
import commonStyles from "../../styles/common";

const defaultValues: ILogin = {
    username: '',
    password: '',
};

const schema = yup.object().shape({
    username: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido')
});

const Login = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { registeredUser } = useAppSelector((state) => state.user);
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (registeredUser) {
            navigation.navigate('Validation');
        }
    }, []);

    const onSubmit = async (values: ILogin): Promise<void> => {
        setLoading(true);

        try {
            await dispatch(loginAction(values)).then(unwrapResult);
        } catch (error) {
            setLoading(false);
            displayErrors(error);
          
            console.log('LOGIN ERROR', error)
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ed0f34' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="headlineMedium">Iniciar Sesión</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={{ gap: 10 }}>
                        <View>
                            <Controller
                                name="username"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="Usuario ó ID Activision"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                            {errors.username && (
                                <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                    {errors.username?.message}
                                </HelperText>
                            )}
                        </View>
                        <View>
                            <Controller
                                name="password"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="Contraseña"
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry
                                    />
                                )}
                            />
                            {errors.password && (
                                <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                    {errors.password?.message}
                                </HelperText>
                            )}
                        </View>
                    </View>
                    <Button onPress={handleSubmit(onSubmit)} loading={loading}>INGRESAR</Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        gap: 10
    },
    titleContainer: {
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        gap: 20
    }
});

export default Login;