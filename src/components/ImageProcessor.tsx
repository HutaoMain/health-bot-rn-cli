import {View, TouchableOpacity, Text} from 'react-native';
// import * as ImagePicker from "expo-image-picker";
import {homeStyles} from '../Styles';
import Icon from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const ImageProcessor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>();

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({});
    // if (!result.canceled) {
    //   console.log(result);
    //   setImage(result.assets[0].uri);
    // }
  };

  useEffect(() => {
    const requestAPI = async () => {
      const formData = new FormData();

      if (image) {
        formData.append('url', image);
        formData.append('language', 'eng');
        formData.append('scale', 'true');
        formData.append('isOverlayRequired', 'false');

        const res = await axios.post(
          'https://api.ocr.space/parse/image',
          formData,
          {
            headers: {
              apikey: 'K89561263988957',
            },
          },
        );
        setText(res.data);
      }
    };
    requestAPI();
  }, []);

  console.log('recognize text: ', text);

  return (
    <View style={homeStyles.imagePicker}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="lock" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageProcessor;
