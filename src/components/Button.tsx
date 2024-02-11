import { Button as PaperButton, ButtonProps } from "react-native-paper";
import { StyleSheet } from 'react-native'

const Button = ({ mode = 'contained', children, ...props }: ButtonProps) => {
    return (
        <PaperButton
            style={styles.button}
            mode={mode}
            labelStyle={{ fontFamily: 'Montserrat-SemiBold' }}
            {...props}
        >
            {children}
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff'
    }
});

export default Button;