import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PlannedTrip_3 from "../../components/PlannedTrip_3"; 
import Colors from "../../constants/Colors";

export default function TestPage2() {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);

  const GetMyTrips = async () => {
    setLoading(true);
    setTrips([]);
    try {
      const querySnapshot = await getDocs(collection(db, "UserTrips"));
      let temp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp.push({ id: doc.id, ...doc.data() });
      });
      setTrips(temp);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    GetMyTrips();
  }, []);

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={{ marginTop: 10 }}>Loading trips…</Text>
      </View>
    );
  }

  return (
    
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        // 🔹 Extract trip details safely
        const parsedTrip = item.tripPlan?.trip || {};
        const dailyPlan = Array.isArray(parsedTrip.dailyPlan)
          ? parsedTrip.dailyPlan
          : [];

        return (
          <ScrollView
            style={{ flex: 1, backgroundColor: Colors.WHITE }}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {/* Trip Header Info */}
            <View style={{ padding: 15 }}>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {parsedTrip.location || "Unknown Location"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 5,
                  color: Colors.DARK_GRAY,
                  fontSize:40
                }}
              >
            This is copy for experiment

              </Text>
            </View>

            {/* Planned Trip UI */}
             
            <PlannedTrip_3 details={dailyPlan} />
          
          </ScrollView>
        );
      }}
    />
  );
}
