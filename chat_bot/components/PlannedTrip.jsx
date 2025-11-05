import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
        <DayCard key={dayIndex} dayIndex={dayIndex} activities={activities} />
      ))}
    </View>
  );
}

// DayCard component with collapse/expand
function DayCard({ dayIndex, activities }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <View
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
      <View>
        <Text></Text>
      </View>
      {/* Day header with toggle */}
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={{
          backgroundColor: Colors.PRIMARY,
          paddingVertical: 10,
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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
        <Text style={{ fontSize: 18, color: Colors.WHITE }}>
          {collapsed ? '▶' : '▼'}
        </Text>
      </TouchableOpacity>

      {/* Activities */}
      {!collapsed && (
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
                source={
                  activity.imageUrl
                    ? { uri: activity.imageUrl }
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
      )}
    </View>
  );
}
