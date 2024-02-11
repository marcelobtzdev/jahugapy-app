import { View, StyleSheet } from "react-native";
import commonStyles from "../../styles/common";
import { displayErrors } from "../../utils/common";
import { addTeamAction, updateTeamAction } from "../../store/actions/team";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useCallback, useState } from "react";
import Button from "../../components/Button";
import IAddUpdateTeam from "../../interfaces/team/addUpdateTeam";
import * as yup from 'yup';
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import { HelperText, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { setCurrentTeam } from "../../store/reducers/team";

const AddEditTeam = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(false);
    const { currentTeam } = useAppSelector(state => state.team);
    const { user } = useAppSelector(state => state.user);

    const defaultValues: IAddUpdateTeam = {
        name: currentTeam ? currentTeam.name : '',
        mode_id: currentTeam ? currentTeam.mode_id : 1,
        members: currentTeam ? currentTeam.members.map(member => ({ activision_id: member.user.activisionId })) : [
            {
                activision_id: ''
            },
            {
                activision_id: ''
            }
        ]
    };
    
    const schema = yup.object().shape({
        name: yup.string().required('Campo requerido'),
        mode_id: yup.number().required('Campo requerido'),
        members: yup.array().required()
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IAddUpdateTeam>({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    const {
        fields,
        append,
        update
      } = useFieldArray({
        control,
        name: "members"
      });

    const onSubmit = async (values: IAddUpdateTeam): Promise<void> => {
        setLoading(true);

        try {
            if (currentTeam) {
                await dispatch(updateTeamAction(values)).then(unwrapResult);
            } else {
                await dispatch(addTeamAction(values)).then(unwrapResult);
            };

            Toast.show({ type: 'success', text1: currentTeam ? 'Equipo actualizado correctamente.' : 'Equipo registrado correctamente.' });

            dispatch(setCurrentTeam(undefined));
            navigation.navigate('TeamList');
        } catch (error) {
            displayErrors(error);
            
            console.log('ADD/EDIT TEAM ERROR', error)
        };
        setLoading(false);
    }

    return (
        <View style={[commonStyles.container, { paddingTop: 30 }]}>
            <View style={styles.titleContainer}>
                <Text variant="headlineSmall" style={commonStyles.title}>{currentTeam ? 'Editar Equipo' : 'AGREGAR EQUIPO'}</Text>
            </View>
            <View style={{ gap: 15 }}>
                <View>
                    <Controller
                        name="name"
                        control={control}
                        render={({field: { onChange, value }}) => (
                            <Input
                                label="Nombre"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.name && (
                        <HelperText type="error" visible>
                            {errors.name?.message}
                        </HelperText>
                    )}
                </View>
                <View style={{ gap: 5 }}>
                    <View>
                        <Text variant="titleLarge" style={commonStyles.textBold}>Miembros</Text>
                    </View>
                    <View style={{ gap: 10 }}>
                        <View>
                            <Input
                                label="ID Activision"
                                value={user?.activisionId}
                                editable={false}
                                textColor="#aaa"
                            />
                        </View>
                        <View>
                            <Controller
                                name={`members.0.activision_id`}
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="ID Activision"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                        </View>
                        <View>
                            <Controller
                                name={`members.1.activision_id`}
                                control={control}
                                render={({field: { onChange, value }}) => (
                                    <Input
                                        label="ID Activision"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ gap: 5 }}>
                    <Button onPress={handleSubmit(onSubmit)} loading={loading}>{currentTeam ? 'ACTUALIZAR' : 'AGREGAR'}</Button>
                    <Button onPress={() => navigation.navigate('TeamList')} mode="elevated">SALIR</Button>
                </View>
            </View>
        </View>
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

export default AddEditTeam;