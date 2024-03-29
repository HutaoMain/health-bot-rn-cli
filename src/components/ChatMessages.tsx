import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, FlatList, Text} from 'react-native';
import ChatBubble from './ChatBubble';
// import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import {homeStyles} from '../Styles';
import {getChatReply} from '../OpenAI';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore';
import {FIRESTORE_DB} from '../FirebaseConfig';
import ImageProcessor from './ImageProcessor';
import IconMenu from 'react-native-vector-icons/Entypo';
import IconLoading from 'react-native-vector-icons/AntDesign';
import IconSend from 'react-native-vector-icons/Ionicons';

interface Props {
  openDrawer: () => void;
  conversationId: string;
}

interface IMessage {
  id: number;
  message: string;
  isUser: boolean;
  createdAt: Date;
}

const ChatMessages = ({openDrawer, conversationId}: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [imageText, setImageText] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (imageText) {
      setInput(imageText);
    }
  }, [imageText]);

  useEffect(() => {
    if (conversationId !== '') {
      const collectionRef = collection(
        FIRESTORE_DB,
        `conversation/${conversationId}/messages`,
      );
      const q = query(collectionRef, orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, (messages: DocumentData) => {
        const messagesData = messages.docs.map((doc: any) => {
          return {id: doc.id, ...doc.data()};
        });
        setMessages(messagesData);
      });

      return unsubscribe;
    } else {
      return;
    }
  }, [conversationId]);

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    setIsLoading(true);

    const message: IMessage = {
      id: messages.length + 1,
      message: input,
      isUser: true,
      createdAt: new Date(),
    };

    try {
      await addDoc(
        collection(FIRESTORE_DB, `conversation/${conversationId}/messages`),
        {
          ...message,
          createdAt: serverTimestamp(),
        },
      );
      setInput('');
    } catch (error) {
      console.error('Error saving user message to Firestore:', error);
    }

    setMessages([...messages, message]);

    try {
      const response = await getChatReply(input);
      const aiMessage: IMessage = {
        id: messages.length + 2,
        message: response,
        isUser: false,
        createdAt: new Date(),
      };

      try {
        await addDoc(
          collection(FIRESTORE_DB, `conversation/${conversationId}/messages`),
          {
            ...aiMessage,
            createdAt: serverTimestamp(),
          },
        );
      } catch (error) {
        console.error('Error saving user message to Firestore:', error);
      }

      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error fetching AI reply:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={homeStyles.container}>
      <TouchableOpacity
        style={homeStyles.drawerButton}
        onPress={() => {
          openDrawer();
        }}>
        <IconMenu name="menu" size={24} color="black" />
        {conversationId === '' ? (
          <Text style={{color: 'black'}}>Please Select Conversation</Text>
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
      {conversationId === '' ? (
        <View style={{flex: 1}}>
          <Text style={homeStyles.chatList}></Text>
        </View>
      ) : (
        <>
          <View style={{flex: 1}}>
            <FlatList
              data={[...messages]}
              renderItem={({item}) => (
                <ChatBubble message={item.message} isUser={item.isUser} />
              )}
              keyExtractor={item => item.id.toString()}
              style={homeStyles.chatList}
            />
          </View>
          <View style={homeStyles.chatContainer}>
            <ImageProcessor setImageText={setImageText} />
            <View style={homeStyles.inputContainer}>
              <TextInput
                style={homeStyles.input}
                onChangeText={text => setInput(text)}
                value={input}
                placeholder="Type your message..."
                placeholderTextColor="black"
              />
              <TouchableOpacity onPress={sendMessage} disabled={isLoading}>
                {isLoading ? (
                  <IconLoading name="loading1" size={24} color="black" />
                ) : (
                  <IconSend name="send" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ChatMessages;
