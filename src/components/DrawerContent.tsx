import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {homeStyles} from '../Styles';
import IconDots from 'react-native-vector-icons/Entypo';
import IconDelete from 'react-native-vector-icons/AntDesign';
import IconCreate from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../zustand/AuthStore';
import UserInitialsAvatar from './UsersInitialAvatar';
import {useEffect, useState} from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  DocumentData,
  doc,
} from 'firebase/firestore';
import {FIRESTORE_DB} from '../FirebaseConfig';
import {ConversationInterface} from '../Types';
import Popover from 'react-native-popover-view';

interface Prop {
  setConversationId: (conversationId: string) => void;
}

const DrawerContent: React.FC<Prop> = ({setConversationId}) => {
  const [conversations, setConversations] = useState<ConversationInterface[]>(
    [],
  );

  const startConversation = async () => {
    try {
      await addDoc(collection(FIRESTORE_DB, 'conversation'), {
        name: `Conversation ${Math.floor(Math.random() * 1000)}`,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, 'conversation', conversationId));
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  useEffect(() => {
    const collectionRef = collection(FIRESTORE_DB, 'conversation');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (conversation: DocumentData) => {
      const conversationData = conversation.docs.map((doc: any) => {
        return {id: doc.id, ...doc.data()};
      });
      setConversations(conversationData);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={homeStyles.drawerContainer}>
      <TouchableOpacity
        style={homeStyles.drawerNewChatButton}
        onPress={startConversation}>
        <IconCreate name="create-outline" size={24} color="black" />
        <Text style={{color: 'black'}}>New Chat</Text>
      </TouchableOpacity>

      <ScrollView style={homeStyles.drawerHistoryContainer}>
        {conversations?.map(conversation => (
          <View
            key={conversation.id}
            style={homeStyles.conversationButtonContainer}>
            <TouchableOpacity
              style={homeStyles.conversationButton}
              onPress={() => setConversationId(conversation.id)}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                {conversation.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.conversationDeleteButton}
              onPress={() => deleteConversation(conversation.id)}>
              <IconDelete name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={homeStyles.profileContainer}>
        {/* <UserInitialsAvatar name={user || ''} />
        <Text style={homeStyles.name}>{user}</Text> */}
        {/* <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => setShowPopover(true)}>
              <IconDots name="dots-three-vertical" size={24} />
            </TouchableOpacity>
          }>
          <TouchableOpacity
            style={{paddingVertical: 20, paddingHorizontal: 40}}
            onPress={clearuser}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </Popover> */}
      </View>
    </View>
  );
};

export default DrawerContent;
