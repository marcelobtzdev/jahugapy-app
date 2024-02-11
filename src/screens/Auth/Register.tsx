import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IAddUpdateUser from "../../interfaces/user/addUpdateUser";
import * as yup from 'yup';
import { useAppDispatch } from "../../hooks/redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserAction } from "../../store/actions/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { displayErrors } from "../../utils/common";
import Toast from 'react-native-toast-message';
import commonStyles from "../../styles/common";

const defaultValues: IAddUpdateUser = {
    username: '',
    activision_id: '',
    phone: '',
    password: '',
    password_confirmation: ''
};

const schema = yup.object().shape({
    username: yup.string().required('Campo requerido'),
    activision_id: yup.string().required('Campo requerido'),
    phone: yup.string().required('Campo requerido'),
    password: yup.string().required('Campo requerido').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    password_confirmation: yup.string().required('Campo requerido').oneOf([yup.ref('password')], 'Las contraseñas no coinciden.')
});

const Register = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (values: IAddUpdateUser): Promise<void> => {
        setLoading(true);

        try {
            await dispatch(addUserAction(values)).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Registrado correctamente.' });
            navigation.navigate('Validation');
        } catch (error) {
            setLoading(false);
            displayErrors(error);
          
            console.log('REGISTER ERROR', error)
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ed0f34' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="headlineMedium">Registrarse</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={{ gap: 15 }}>
                        <View>
                            <Controller
                                name="username"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="Usuario"
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
                                name="activision_id"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="ID Activision"
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="usuario#123456"
                                        placeholderTextColor={"#666"}
                                    />
                                )}
                            />
                            {errors.activision_id && (
                                <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                    {errors.activision_id?.message}
                                </HelperText>
                            )}
                        </View>
                        <View>
                            <Controller
                                name="phone"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="Teléfono"
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType="phone-pad"
                                        placeholder="0971222333"
                                        placeholderTextColor={"#666"}
                                    />
                                )}
                            />
                            {errors.phone && (
                                <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                    {errors.phone?.message}
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
                        <View>
                            <Controller
                                name="password_confirmation"
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="Confirmar contraseña"
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry
                                    />
                                )}
                            />
                            {errors.password_confirmation && (
                                <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                    {errors.password_confirmation?.message}
                                </HelperText>
                            )}
                        </View>
                    </View>
                    <Button onPress={handleSubmit(onSubmit)} loading={loading}>REGISTRARME</Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
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

export default Register;