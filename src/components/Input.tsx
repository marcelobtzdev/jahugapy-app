import { TextInput, TextInputProps } from "react-native-paper";
import { StyleSheet } from 'react-native';

const Input = ({ mode = 'outlined', label, ...props }: TextInputProps) => {
    return (
        <TextInput
            style={styles.input} 
            mode={mode}
            label={label}
            placeholderTextColor={'#fff'}
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {}
});

export default Input;