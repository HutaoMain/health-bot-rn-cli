import React from 'react';
import {View, Text} from 'react-native';
import {chatBubbleStyles} from '../Styles';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({message, isUser}) => {
  return (
    <View
      style={[
        chatBubbleStyles.messageContainer,
        isUser
          ? chatBubbleStyles.userMessageContainer
          : chatBubbleStyles.aiMessageContainer,
      ]}>
      <Text
        style={[
          chatBubbleStyles.messageText,
          isUser
            ? chatBubbleStyles.userMessageText
            : chatBubbleStyles.aiMessageText,
        ]}>
        {message}
      </Text>
    </View>
  );
};

export default ChatBubble;
