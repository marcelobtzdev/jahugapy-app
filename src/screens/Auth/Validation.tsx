import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import IUserValidation from "../../interfaces/user/validation";
import { useAppDispatch } from "../../hooks/redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { resendValidationCodeAction, validateUserAction } from "../../store/actions/user";
import Toast from "react-native-toast-message";
import { displayErrors } from "../../utils/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import commonStyles from "../../styles/common";

const defaultValues: IUserValidation = {
    code: '',
};

const schema = yup.object().shape({
    code: yup.string().required('Campo requerido'),
});

const Validation = () => {
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

    const onSubmit = async (values: IUserValidation): Promise<void> => {
        setLoading(true);

        try {
            await dispatch(validateUserAction(values)).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Teléfono validado correctamente. Ya puedes iniciar sesión.' });
            navigation.navigate('Welcome');
        } catch (error) {
            setLoading(false);
            displayErrors(error);
          
            console.log('VALIDATION ERROR', error)
        };
    }

    const resendValidationCode = async (): Promise<void> => {
        try {
            await dispatch(resendValidationCodeAction()).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Te hemos enviado otro código de validación' });
        } catch (error) {
            displayErrors(error);
          
            console.log('RESEND VALIDATION CODE ERROR', error)
        };
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ed0f34' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="headlineMedium">Validación</Text>
                    <Text variant="bodyLarge">Por favor ingresa el código que te enviamos por SMS para que podamos validar tu teléfono</Text>
                </View>
                <View style={styles.formContainer}>
                    <View>
                        <Controller
                            name="code"
                            control={control}
                            render={({field: { onChange, value }}) => (
                                <Input
                                    label="Código"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="number-pad"
                                />
                            )}
                        />
                        {errors.code && (
                            <HelperText type="error" visible style={[commonStyles.helperTextPrimary, { color: '#fff' }]}>
                                {errors.code?.message}
                            </HelperText>
                        )}
                    </View>
                    <TouchableOpacity onPress={resendValidationCode}>
                        <Text variant="bodyLarge" style={styles.resendCodeText}>Reenviar código</Text>
                    </TouchableOpacity>
                    <Button onPress={handleSubmit(onSubmit)} loading={loading}>VALIDAR</Button>
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
    },
    titleContainer: {
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        gap: 15,
    },
    resendCodeText: {
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});

export default Validation;