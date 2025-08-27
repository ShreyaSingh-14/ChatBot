import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/Colors';
import ChatBot from './ChatBot'; // Import the ChatBot component

export default function PlannedTrip_3({ details = [] }) {
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

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

          {details.map(({ day, activities }, dayIndex) => (
            <View key={dayIndex} style={styles.card}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayText}>Day {dayIndex + 1}</Text>
                <TouchableOpacity
                  style={styles.chatIconBtn}
                  onPress={() => openChat(dayIndex + 1)}
                >
                  <Text style={styles.chatIconText}>💬</Text>
                </TouchableOpacity>
              </View>

              <View style={{ padding: 15 }}>
                {activities.map((activity, activityIndex) => (
                  <View key={activityIndex} style={styles.activityCard}>
                    <Image
                      source={
                        activity.imageUrl
                          ? { uri: activity.imageUrl }
                          : require('../assets/images/placeholder.jpeg')
                      }
                      style={{ width: '100%', height: 150 }}
                    />
                    <View style={{ padding: 10 }}>
                      <Text style={styles.activityTitle}>
                        {activity.time ? activity.time + ' - ' : ''}
                        {activity.place || 'Unknown Place'}
                      </Text>
                      <Text style={styles.activityDesc}>
                        {activity.details ||
                          'Amazing place to spend time with loved ones.'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Chat Modal with Custom ChatBot Component */}
      <Modal
        visible={chatVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeChat}
      >
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <View style={styles.chatWindowModal} pointerEvents="auto">
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
  dayText: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: Colors.WHITE,
  },
  activityCard: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_GRAY,
    overflow: 'hidden',
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