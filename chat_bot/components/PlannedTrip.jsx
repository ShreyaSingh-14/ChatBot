import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';

export default function PlannedTrip({ details = [] }) {
 
  return (
    <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 24,
          marginBottom: 15,
          textAlign: 'center',
        }}
      >
        🏕️ Planned Trip
      </Text>
      {details.map(({ day, activities }, dayIndex) => (
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

          {/* Activities */}
          <View style={{ padding: 15 }}>
            {activities.map((activity, activityIndex) => (
              <View
                key={activityIndex}
                style={{
                  marginBottom: 20,
                  borderRadius: 12,
                  backgroundColor: Colors.LIGHT_GRAY,
                  overflow: 'hidden',
                }}
              >
                <Image
                   source={activity.imageUrl
                                       ? { uri: activity.imageUrl }:require('../assets/images/placeholder.jpeg')
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
                    {activity.time ? activity.time + ' - ' : ''}
                    {activity.place || 'Unknown Place'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 14,
                      color: Colors.DARK_GRAY,
                      lineHeight: 20,
                    }}
                  >
                    {activity.details ||
                      'Amazing place to spend time with loved ones.'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
