import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import Button from './Button';
import commonStyles from '../styles/common';

interface IImagePickerProps {
  placeholder?: string
  onPick: (assets: Array<ImagePickerAsset>) => void;
  initialImage?: string
}

export default function ImageSelector({ onPick, placeholder = 'Ninguna imagen seleccionada', initialImage }: IImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    } else {
      setImage(null);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onPick(result.assets);
    }
  };

  return (
    <TouchableOpacity>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: image ? 0 : 15 }}>
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} resizeMode='cover' />}
            {!image && <Text variant="bodyLarge" style={commonStyles.title}>{placeholder}</Text>}
          </View>
          <View style={{ justifyContent: 'center', paddingRight: image ? 15 : 0 }}>
            <Button onPress={pickImage}>{image ? 'Cambiar' : 'Seleccionar'}</Button>
          </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      borderWidth: 1,
      borderColor: '#ed0f34',
      borderRadius: 4
    }
});
