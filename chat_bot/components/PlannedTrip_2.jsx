import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, Animated } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import Colors from '../constants/Colors';

export default function PlannedTrip_2({ details = [] }) {
  const [tripDetails, setTripDetails] = useState(details);

  const [orderMap, setOrderMap] = useState(
    details.map((day, dayIndex) => ({
      day: dayIndex + 1,
      activities: day.activities.map((_, i) => i),
    }))
  );

  const handleReorder = (dayIndex, newData) => {
    const newDetails = [...tripDetails];
    newDetails[dayIndex].activities = newData;
    setTripDetails(newDetails);

    const newOrder = [...orderMap];
    newOrder[dayIndex].activities = newData.map((_, i) => i);
    setOrderMap(newOrder);

    console.log('Temporary order json:', newOrder);
  };

  return (
    <View style={{ marginTop: 20, paddingHorizontal: 10, flex: 1 }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 24,
          marginBottom: 15,
          textAlign: 'center',
          marginTop: 30,
        }}
      >
        🏕️ Planned Trip
      </Text>

      {tripDetails.map((dayData, dayIndex) => (
        <View
          key={dayIndex}
          style={{
            marginBottom: 25,
            borderRadius: 18,
            backgroundColor: Colors.WHITE,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 3,
            overflow: 'hidden',
          }}
        >
          {/* Day header */}
          <View
            style={{
              backgroundColor: Colors.PRIMARY,
              paddingVertical: 10,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                color: Colors.WHITE,
              }}
            >
              Day {dayIndex + 1}
            </Text>
          </View>

          {/* Draggable Activities */}
          <View style={{ padding: 15, flex: 1 }}>
            <DraggableFlatList
              data={dayData.activities}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : `activity-${dayIndex}-${JSON.stringify(item)}`
              }
              onDragEnd={({ data }) => handleReorder(dayIndex, data)}
              renderItem={({ item, drag, isActive }) => {
                // Animated values
                const tilt = useRef(new Animated.Value(0)).current; // rotation
                const lift = useRef(new Animated.Value(0)).current; // translate + scale

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
                      style={{
                        marginBottom: 20,
                        borderRadius: 12,
                        backgroundColor: Colors.LIGHT_GRAY,
                        overflow: 'hidden',
                        transform: [{ rotate }, { translateY }, { scale }],
                        shadowColor: '#000',
                        shadowOpacity: isActive ? 0.35 : 0.1,
                        shadowOffset: { width: 0, height: isActive ? 10 : 3 },
                        shadowRadius: isActive ? 20 : 6,
                        elevation: isActive ? 12 : 3,
                      }}
                    >
                      <Pressable onLongPress={drag} delayLongPress={150}>
                        <Image
                          source={
                            item.imageUrl
                              ? { uri: item.imageUrl }
                              : require('../assets/images/placeholder.jpeg')
                          }
                          style={{
                            width: '100%',
                            height: 150,
                          }}
                        />
                        <View style={{ padding: 10 }}>
                          <Text
                            style={{
                              fontFamily: 'outfit-bold',
                              fontSize: 18,
                              marginBottom: 5,
                            }}
                          >
                            {item.time ? item.time + ' - ' : ''}
                            {item.place || 'Unknown Place'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'outfit',
                              fontSize: 14,
                              color: Colors.DARK_GRAY,
                              lineHeight: 20,
                            }}
                          >
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
        </View>
      ))}
    </View>
  );
}
