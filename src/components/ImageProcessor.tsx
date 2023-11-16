import {View, TouchableOpacity} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {homeStyles} from '../Styles';
import IconImage from 'react-native-vector-icons/Entypo';
import React, {useEffect, useState} from 'react';
import TextRecognition from '@react-native-ml-kit/text-recognition';

interface Prop {
  setImageText: (imageText: string) => void;
}

const ImageProcessor = ({setImageText}: Prop) => {
  const [image, setImage] = useState<string | null>(null);

  const imagePickerOptions: ImageLibraryOptions = {
    mediaType: 'photo',
  };

  const selectImage = async () => {
    try {
      const response = await launchImageLibrary(imagePickerOptions);
      if (
        !response.didCancel &&
        !response.errorMessage &&
        response.assets &&
        response.assets.length > 0
      ) {
        const selectedImageURI = response.assets[0].uri;
        setImage('Please wait');
        setImage(selectedImageURI || '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchText = async () => {
      if (image) {
        // console.log(image);
        const result = await TextRecognition.recognize(image);
        setImageText(
          result.text +
            ' \n this is from a blood chem result, could you explain this to me',
        );
      }
    };
    fetchText();
  }, [image]);

  return (
    <View style={homeStyles.imagePicker}>
      <TouchableOpacity
        onPress={selectImage}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconImage name="image" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageProcessor;
