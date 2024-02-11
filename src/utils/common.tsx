import { AxiosError } from "axios";
import Toast from 'react-native-toast-message';
import IResponseData from "../interfaces/responseData";

export const displayErrors = (e: unknown) => {
    let errorMessage: string | undefined;
    const error = e as AxiosError<IResponseData>;

    switch (error.response?.status) {
        case 422:
            const errors = error.response?.data?.errors;
            const errorValues = errors ? Object.entries(errors).map(([key, value]) => value) : null;
            
            errorMessage = errorValues![0][0];

            break;
        default:
            errorMessage = error.response?.data?.message;
    }

    if (error.code != 'ERR_NETWORK') {
        Toast.show({type: 'error', text1: errorMessage});
    }
};