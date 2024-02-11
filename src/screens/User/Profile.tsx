import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { HelperText, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IAddUpdateUser from "../../interfaces/user/addUpdateUser";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserAction } from "../../store/actions/user";
import { unwrapResult } from "@reduxjs/toolkit";
import { displayErrors } from "../../utils/common";
import Toast from 'react-native-toast-message';
import commonStyles from "../../styles/common";

const Profile = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.user);

    const defaultValues: IAddUpdateUser = {
        username: user?.username!,
        activision_id: user?.activisionId!,
        phone: user?.phone!,
    };
    
    const schema = yup.object().shape({
        username: yup.string().required('Campo requerido'),
        activision_id: yup.string().required('Campo requerido'),
    });

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
            await dispatch(updateUserAction(values)).then(unwrapResult);

            Toast.show({ type: 'success', text1: 'Actualizado correctamente.' });
        } catch (error) {
            displayErrors(error);
            
            console.log('PROFILE UPDATE ERROR', error)
        };

        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="headlineSmall" style={commonStyles.title}>Editar Perfil</Text>
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
                                <HelperText type="error" visible>
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
                                    />
                                )}
                            />
                            {errors.activision_id && (
                                <HelperText type="error" visible>
                                    {errors.activision_id?.message}
                                </HelperText>
                            )}
                        </View>
                        <View>
                            <Input
                                label="Teléfono"
                                value={user?.phone}
                                editable={false}
                                textColor="#aaa"
                            />
                        </View>
                    </View>
                    <Button onPress={handleSubmit(onSubmit)} loading={loading}>GUARDAR</Button>
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

export default Profile;