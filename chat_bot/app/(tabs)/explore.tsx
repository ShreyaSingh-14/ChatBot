
import { View, Text } from 'react-native'
import React from 'react'
import ExplorePage from './../../App_new/Pages/ExplorePage'

export default function explore() {
  return (
    <View>
      <ExplorePage/>
    </View>
  )
}
// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ScrollView } from "react-native";
// import tripData from "../../assets/data/tripData.json"; // adjust path as per your folder

// export default function Explore() {
//   const [dayPlan, setDayPlan] = useState<any[]>([]);

//   useEffect(() => {
//     // load data from JSON
//     if (tripData && tripData.days) {
//       setDayPlan(tripData.days);
//       console.log("Loaded trip data:", tripData);
//     } else {
//       console.error("Invalid JSON format");
//     }
//   }, []);

//   return (
//     <ScrollView style={{ padding: 10, marginTop: 20 }}>
//       {dayPlan.map((day, index) => (
//         <View key={index} style={{ marginBottom: 20 }}>
//           <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
//             Day {day.day}
//           </Text>
//           {day.activities.map((activity: any, idx: number) => (
//             <View key={idx} style={{ marginBottom: 15 }}>
//               <Text style={{ fontSize: 16 }}>{activity.time} - {activity.place}</Text>
//               <Text>{activity.details}</Text>
//               {activity.imageUrl ? (
//                 <Image
//                   source={{ uri: activity.imageUrl }}
//                   style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 5 }}
//                 />
//               ) : null}
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// }
