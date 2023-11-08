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
  closeDrawer: () => void;
  openDrawer: () => void;
  drawerOpen: any;
  setDrawerOpen: any;
  setConversationId: (conversationId: string) => void;
}

const DrawerContent: React.FC<Prop> = ({
  closeDrawer,
  openDrawer,
  drawerOpen,
  setDrawerOpen,
  setConversationId,
}) => {
  const user = useAuthStore(item => item.user);
  const [conversations, setConversations] = useState<ConversationInterface[]>(
    [],
  );
  const [showPopover, setShowPopover] = useState<boolean>(false);

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

  const clearuser = useAuthStore(state => state.clearUser);

  return (
    <View style={homeStyles.drawerContainer}>
      {/* <TouchableOpacity
        onPress={() => {
          drawerOpen ? closeDrawer() : openDrawer();
          setDrawerOpen(!drawerOpen);
        }}
        style={homeStyles.drawerCloseBtn}>
        <Icon name="menu" size={24} />
      </TouchableOpacity> */}

      <TouchableOpacity
        style={homeStyles.drawerNewChatButton}
        onPress={startConversation}>
        <IconCreate name="create-outline" size={24} />
        <Text>New Chat</Text>
      </TouchableOpacity>

      <ScrollView style={homeStyles.drawerHistoryContainer}>
        {conversations?.map(conversation => (
          <View
            key={conversation.id}
            style={homeStyles.conversationButtonContainer}>
            <TouchableOpacity
              style={homeStyles.conversationButton}
              onPress={() => setConversationId(conversation.id)}>
              <Text style={{textAlign: 'center'}}>{conversation.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.conversationDeleteButton}
              onPress={() => deleteConversation(conversation.id)}>
              <IconDelete name="delete" size={24} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={homeStyles.profileContainer}>
        <UserInitialsAvatar name={user || ''} />
        <Text style={homeStyles.name}>{user}</Text>
        <Popover
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
        </Popover>
      </View>
    </View>
  );
};

export default DrawerContent;
