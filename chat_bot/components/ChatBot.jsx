import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import Colors from '../constants/Colors';

export default function ChatBot({ isVisible, onClose, dayNumber = null }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm your trip assistant${dayNumber ? ` for Day ${dayNumber}` : ''}. I can help you with:
• Activity suggestions
• Local recommendations  
• Travel tips
• Restaurant suggestions
• Transportation info

What would you like to know?`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef();

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText.trim());
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('restaurant') || input.includes('food') || input.includes('eat')) {
      return `🍽️ Great choice! For ${dayNumber ? `Day ${dayNumber}` : 'your trip'}, I recommend:

• Local cuisine restaurants near your activities
• Highly-rated places with good reviews
• Budget-friendly options
• Vegetarian/vegan alternatives

Would you like specific restaurant recommendations for any particular area?`;
    }
    
    if (input.includes('transport') || input.includes('travel') || input.includes('getting')) {
      return `🚗 Transportation tips for ${dayNumber ? `Day ${dayNumber}` : 'your trip'}:

• Book cabs in advance for popular destinations
• Consider public transport for city areas
• Check local transport apps
• Allow extra time during peak hours

Need help with specific routes or transport options?`;
    }
    
    if (input.includes('activity') || input.includes('things') || input.includes('do')) {
      return `🎯 Activity suggestions${dayNumber ? ` for Day ${dayNumber}` : ''}:

• Check weather conditions before outdoor activities
• Book tickets in advance for popular attractions
• Consider local cultural experiences
• Plan rest time between activities

What type of activities interest you most?`;
    }

    if (input.includes('weather') || input.includes('climate')) {
      return `🌤️ Weather planning tips:

• Check local weather forecast
• Pack appropriate clothing
• Have backup indoor activities
• Consider seasonal variations

Would you like tips for any specific weather conditions?`;
    }

    // Default response
    return `Thanks for your question! I'm here to help with your trip planning. You can ask me about:

🍽️ Restaurants and local food
🚗 Transportation options  
🎯 Activities and attractions
🌤️ Weather and packing tips
📍 Local recommendations

What specific information would you like?`;
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: `Chat cleared! How can I help you with your trip${dayNumber ? ` for Day ${dayNumber}` : ''}?`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  if (!isVisible) return null;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>
            🤖 Trip Assistant {dayNumber ? `- Day ${dayNumber}` : ''}
          </Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.clearBtn} onPress={clearChat}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.isBot ? styles.botMessage : styles.userMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              message.isBot ? styles.botMessageText : styles.userMessageText
            ]}>
              {message.text}
            </Text>
            <Text style={[
              styles.timestamp,
              message.isBot ? styles.botTimestamp : styles.userTimestamp
            ]}>
              {message.timestamp}
            </Text>
          </View>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <View style={[styles.messageBubble, styles.botMessage, styles.typingBubble]}>
            <Text style={styles.typingText}>Bot is typing...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me about your trip..."
          multiline={true}
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendBtn, inputText.trim() ? styles.sendBtnActive : {}]}
          onPress={sendMessage}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE || '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY || '#e0e0e0',
    backgroundColor: Colors.PRIMARY || '#007AFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE || '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  clearBtnText: {
    fontSize: 12,
    color: Colors.WHITE || '#FFFFFF',
    fontWeight: '600',
  },
  closeBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.WHITE || '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContent: {
    padding: 16,
  },
  messageBubble: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  botMessage: {
    backgroundColor: Colors.WHITE || '#FFFFFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: Colors.PRIMARY || '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botMessageText: {
    color: Colors.DARK_GRAY || '#333',
  },
  userMessageText: {
    color: Colors.WHITE || '#FFFFFF',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  botTimestamp: {
    color: Colors.GRAY || '#666',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.8)',
  },
  typingBubble: {
    opacity: 0.7,
  },
  typingText: {
    fontSize: 14,
    color: Colors.GRAY || '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.LIGHT_GRAY || '#e0e0e0',
    backgroundColor: Colors.WHITE || '#FFFFFF',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY || '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: Colors.LIGHT_GRAY || '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnActive: {
    backgroundColor: Colors.PRIMARY || '#007AFF',
  },
  sendBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.WHITE || '#FFFFFF',
  },
});