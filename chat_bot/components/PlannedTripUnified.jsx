import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Pressable, 
  Animated, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  Modal,
  Keyboard,
  Dimensions
} from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Colors from '../constants/Colors';
import ChatBot from './ChatBot';

export default function PlannedTripUnified({ details = [] }) {
  const [expandedDay, setExpandedDay] = useState(null);
  const [tripDetails, setTripDetails] = useState(details);
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [screenHeight] = useState(Dimensions.get('window').height);

  const [orderMap, setOrderMap] = useState(
    details.map((day, dayIndex) => ({
      day: dayIndex + 1,
      activities: day.activities.map((_, i) => i),
    }))
  );

  // Keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleDayToggle = (dayIndex) => {
    // If clicking the same day that's already expanded, collapse it
    // Otherwise, expand the clicked day
    setExpandedDay(expandedDay === dayIndex ? null : dayIndex);
  };

  const handleReorder = (dayIndex, newData) => {
    const newDetails = [...tripDetails];
    newDetails[dayIndex].activities = newData;
    setTripDetails(newDetails);

    const newOrder = [...orderMap];
    newOrder[dayIndex].activities = newData.map((_, i) => i);
    setOrderMap(newOrder);

    console.log('Temporary order json:', newOrder);
  };

  const openChat = (dayNumber) => {
    setSelectedDay(dayNumber);
    setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
    setSelectedDay(null);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Main Content */}
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 10,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>🏕️ Planned Trip</Text>

          {tripDetails.map((dayData, dayIndex) => (
            <View key={dayIndex} style={styles.card}>
              {/* Day header with toggle and chat button */}
              <View style={styles.dayHeader}>
                <TouchableOpacity
                  onPress={() => handleDayToggle(dayIndex)}
                  style={styles.dayHeaderLeft}
                >
                  <Text style={styles.dayText}>Day {dayIndex + 1}</Text>
                  <Text style={styles.toggleIcon}>
                    {expandedDay === dayIndex ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chatIconBtn}
                  onPress={() => openChat(dayIndex + 1)}
                >
                  <Text style={styles.chatIconText}>💬</Text>
                </TouchableOpacity>
              </View>

              {/* Activities - only show when expanded */}
              {expandedDay === dayIndex && (
                <View style={styles.activitiesContainer}>
                  <DraggableFlatList
                    data={dayData.activities}
                    keyExtractor={(item, index) =>
                      item.id ? item.id.toString() : `activity-${dayIndex}-${JSON.stringify(item)}`
                    }
                    onDragEnd={({ data }) => handleReorder(dayIndex, data)}
                    renderItem={({ item, drag, isActive }) => {
                      // Animated values for drag feedback
                      const tilt = useRef(new Animated.Value(0)).current;
                      const lift = useRef(new Animated.Value(0)).current;

                      useEffect(() => {
                        if (isActive) {
                          Animated.parallel([
                            Animated.timing(tilt, {
                              toValue: 1,
                              duration: 150,
                              useNativeDriver: true,
                            }),
                            Animated.spring(lift, {
                              toValue: 1,
                              friction: 5,
                              useNativeDriver: true,
                            }),
                          ]).start();
                        } else {
                          Animated.parallel([
                            Animated.timing(tilt, {
                              toValue: 0,
                              duration: 200,
                              useNativeDriver: true,
                            }),
                            Animated.spring(lift, {
                              toValue: 0,
                              friction: 5,
                              useNativeDriver: true,
                            }),
                          ]).start();
                        }
                      }, [isActive]);

                      const rotate = tilt.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-4deg'],
                      });

                      const translateY = lift.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -6],
                      });

                      const scale = lift.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.87],
                      });

                      return (
                        <ScaleDecorator>
                          <Animated.View
                            style={[
                              styles.activityCard,
                              {
                                transform: [{ rotate }, { translateY }, { scale }],
                                shadowOpacity: isActive ? 0.35 : 0.1,
                                shadowOffset: { width: 0, height: isActive ? 10 : 3 },
                                shadowRadius: isActive ? 20 : 6,
                                elevation: isActive ? 12 : 3,
                              }
                            ]}
                          >
                            <Pressable onLongPress={drag} delayLongPress={150}>
                              <Image
                                source={
                                  item.imageUrl
                                    ? { uri: item.imageUrl }
                                    : require('../assets/images/placeholder.jpeg')
                                }
                                style={styles.activityImage}
                              />
                              <View style={styles.activityContent}>
                                <Text style={styles.activityTitle}>
                                  {item.time ? item.time + ' - ' : ''}
                                  {item.place || 'Unknown Place'}
                                </Text>
                                <Text style={styles.activityDesc}>
                                  {item.details ||
                                    'Amazing place to spend time with loved ones.'}
                                </Text>
                              </View>
                            </Pressable>
                          </Animated.View>
                        </ScaleDecorator>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Chat Modal */}
      <Modal
        visible={chatVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeChat}
      >
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <View style={[
            styles.chatWindowModal,
            {
              marginTop: keyboardHeight > 0 ? -keyboardHeight/2 : -200,
              height: keyboardHeight > 0 ? 350 : 400,
            }
          ]} pointerEvents="auto">
            <ChatBot 
              isVisible={chatVisible}
              onClose={closeChat}
              dayNumber={selectedDay}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND || '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    marginBottom: 25,
    borderRadius: 18,
    backgroundColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dayText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.WHITE,
  },
  toggleIcon: {
    fontSize: 18,
    color: Colors.WHITE,
    marginLeft: 10,
  },
  chatIconBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  chatIconText: {
    fontSize: 20,
    color: Colors.WHITE || '#FFFFFF',
  },
  activitiesContainer: {
    padding: 15,
    flex: 1,
  },
  activityCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_GRAY,
    overflow: 'hidden',
    shadowColor: '#000',
  },
  activityImage: {
    width: '100%',
    height: 150,
  },
  activityContent: {
    padding: 10,
  },
  activityTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    marginBottom: 5,
  },
  activityDesc: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: Colors.DARK_GRAY,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatWindowModal: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -175,
    marginTop: -200,
    width: 350,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 30,
  },
});
