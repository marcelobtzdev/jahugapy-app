import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        flex: 1,
        gap: 10
    },
    card: {
        backgroundColor: '#fff'
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        color: '#333'
    },
    textBold: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#000'
    },
    title: {
        color: '#333'
    },
    helperTextPrimary: {
        color: '#ed0f34',
        fontFamily: 'Montserrat-Regular',
        paddingLeft: 0
    }
});

export default commonStyles;