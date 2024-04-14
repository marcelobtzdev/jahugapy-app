import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { HelperText, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import IAddUpdateScore from "../../../interfaces/event/addUpdateScore";
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addEventScoreAction, updateEventScoreAction } from "../../../store/actions/event";
import { unwrapResult } from "@reduxjs/toolkit";
import { displayErrors } from "../../../utils/common";
import Toast from 'react-native-toast-message';
import commonStyles from "../../../styles/common";
import ImageSelector from "../../../components/ImageSelector";
import { setCurrentScore } from "../../../store/reducers/event";

const AddEditEventScore = ({ navigation, route }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const { teamId, dateNumber, matchNumber } = route.params;
    const { currentScore } = useAppSelector(state => state.event);

    const defaultValues: IAddUpdateScore = {
        team_id: String(teamId),
        date_number: String(dateNumber),
        match_number: String(matchNumber),
        kills: currentScore ? String(currentScore.kills) : '',
        kills_image: '',
        position: currentScore ? String(currentScore.position) : '',
        position_image: ''
    };
    
    const schema = yup.object().shape({
        team_id: yup.string().required('Campo requerido'),
        date_number: yup.string().required('Campo requerido'),
        match_number: yup.string().required('Campo requerido'),
        kills: yup.string().required('Campo requerido'),
        kills_image: yup.string().required('Campo requerido'),
        position: yup.string().required('Campo requerido'),
        position_image: yup.string().required('Campo requerido'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        reset(defaultValues);
    }, [currentScore])

    const onSubmit = async (values: IAddUpdateScore): Promise<void> => {
        setLoading(true);

        try {
            if (currentScore) {
                await dispatch(updateEventScoreAction(values)).then(unwrapResult);
            } else {
                await dispatch(addEventScoreAction(values)).then(unwrapResult);
            };

            Toast.show({ type: 'success', text1: currentScore ? 'Reporte actualizado correctamente.' : 'Partida reportada correctamente.' });

            dispatch(setCurrentScore(undefined));

            navigation.push('EventDetail');
        } catch (error) {
            displayErrors(error);
            
            console.log('EVENT SCORE ADD/UPDATE ERROR', error)
        };

        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text variant="headlineSmall" style={commonStyles.title}>Reportar Partida {matchNumber}</Text>
                </View>
                <ScrollView>
                    <View style={styles.formContainer}>
                        <View style={{ gap: 15 }}>
                            <View>
                                <Controller
                                    name="kills"
                                    control={control}
                                    render={({field: { onChange, value }}) => (
                                        <Input
                                            label="Kills"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.kills && (
                                    <HelperText type="error" visible>
                                        {errors.kills?.message}
                                    </HelperText>
                                )}
                            </View>
                            <View>
                                <Controller
                                    name="kills_image"
                                    control={control}
                                    render={({field: { onChange }}) => (
                                        <ImageSelector placeholder="Captura Kills" onPick={(assets) => onChange(assets[0].base64) } />
                                    )}
                                />
                                {errors.kills_image && (
                                    <HelperText type="error" visible>
                                        {errors.kills_image?.message}
                                    </HelperText>
                                )}
                            </View>
                            <View>
                                <Controller
                                    name="position"
                                    control={control}
                                    render={({field: { onChange, value }}) => (
                                        <Input
                                            label="Posición"
                                            value={value}
                                            onChangeText={onChange}
                                        />
                                    )}
                                />
                                {errors.position && (
                                    <HelperText type="error" visible>
                                        {errors.position?.message}
                                    </HelperText>
                                )}
                            </View>
                            <View>
                                <Controller
                                    name="position_image"
                                    control={control}
                                    render={({field: { onChange, value }}) => (
                                        <ImageSelector placeholder="Captura Posición" onPick={(assets) => onChange(assets[0].base64) } />
                                    )}
                                />
                                {errors.position_image && (
                                    <HelperText type="error" visible>
                                        {errors.position_image?.message}
                                    </HelperText>
                                )}
                            </View>
                        </View>
                        <View style={{ gap: 5 }}>
                            <Button onPress={handleSubmit(onSubmit)} loading={loading}>{currentScore ? 'ACTUALIZAR REPORTE' : 'REPORTAR'}</Button>
                            <Button onPress={() => navigation.push('EventDetail')} mode="elevated">SALIR</Button>
                        </View>
                    </View>
                </ScrollView>
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

export default AddEditEventScore;