import { useState } from 'react';
import { PaperSelect } from 'react-native-paper-select';
import { ListItem, SelectedItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import { StyleSheet } from 'react-native';

interface ISelectProps {
    placeholder: string
    options: ListItem[]
    selected?: SelectedItem
    onSelect: (value: SelectedItem) => void
};

const Select = ({ placeholder, options, selected, onSelect }: ISelectProps) => {
    const [selectedOption, setSelectedOption] = useState<SelectedItem>({
        text: '',
        selectedList: []
    });

    const hanldeOnSelect = (selected: SelectedItem) => {
        setSelectedOption(selected);

        onSelect(selected);
    };

    return (
        <PaperSelect
            label={placeholder}
            value={selectedOption.text}
            onSelection={(value: SelectedItem) => hanldeOnSelect(value)}
            arrayList={options}
            selectedArrayList={selectedOption.selectedList}
            hideSearchBox={true}
            checkboxProps={{ checkboxColor: '#ed0f34', checkboxLabelStyle: { fontFamily: 'Montserrat-Regular' } }}
            dialogCloseButtonText='CERRAR'
            dialogDoneButtonText='ACEPTAR'
            dialogCloseButtonStyle={styles.button}
            dialogDoneButtonStyle={styles.button}
            textInputStyle={styles.input}
            textInputProps={{ underlineColor: '#ed0f34'}}
            multiEnable={false}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        fontFamily: 'Montserrat-Regular'
    },
    input: {
        backgroundColor: '#fff'
    }
});

export default Select;