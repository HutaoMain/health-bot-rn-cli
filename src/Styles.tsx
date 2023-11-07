import {StyleSheet} from 'react-native';
import React from 'react';

export const loginStyles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#FFF4EE',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(255, 244, 238, 0.6)',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },
  input_container: {
    width: '90%',
    height: 50,
    paddingLeft: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
  },
  forgotContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  forgotPass: {
    backgroundColor: 'transparent',
  },
  button: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: '#79DB90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  register_container: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  register_text: {
    fontWeight: 'bold',
    color: '#2A3890', // blue
    fontSize: 18,
  },
});

// Registration
export const registrationStyles = StyleSheet.create({
  registration: {
    flex: 1,
    backgroundColor: '#FFF4EE',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(255, 244, 238, 0.6)',
    flex: 1,
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: 'cover',
  },

  input_container: {
    width: '90%',
  },
  input_label: {
    paddingLeft: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 13,
    marginBottom: 10,
    marginTop: 3,
    backgroundColor: 'white',
  },
  button: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: '#79DB90',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
  },
  buttonGoBack: {
    color: 'black',
    textAlign: 'center',
    lineHeight: 40,
    fontSize: 16,
  },
});

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  drawerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    marginTop: 15,
  },
  chatContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
  },
  input: {
    height: 40,
    width: '90%',
    alignItems: 'center',
  },
  drawerContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  drawerCloseBtn: {
    position: 'absolute',
    right: -50,
    elevation: 50,
  },
  drawerHistoryContainer: {
    flex: 1,
    marginBottom: 10,
  },
  drawerNewChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#79DB90',
    borderRadius: 5,
  },
  conversationButtonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    width: '100%',
  },
  conversationButton: {
    backgroundColor: '#CFCAC7',
    flex: 1,
    height: '100%',
    width: '80%',
    paddingVertical: 20,
  },
  conversationDeleteButton: {
    height: '100%',
    width: '20%',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  },
  profileImage: {
    width: 45,
    height: 45,
  },
  name: {
    flexWrap: 'wrap',
    width: '82%',
    paddingLeft: 10,
  },
  chatHistory: {
    flex: 1,
  },
  chatList: {
    paddingHorizontal: 10,
  },
  //   chatBubleContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //   },
  //   chatImage: {
  //     width: 50,
  //     height: 50,
  //   },
  chatBubble: {
    // Common properties for all chat bubbles
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  userChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#79DB90',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    maxWidth: '70%',
  },
  otherChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    maxWidth: '70%',
  },

  chatText: {
    color: 'white',
    fontSize: 16,
  },
});

export const chatBubbleStyles = StyleSheet.create({
  messageContainer: {
    borderRadius: 10,
    marginBottom: 8,
    padding: 10,
    maxWidth: '70%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a73e8',
    marginRight: 10,
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
});
