import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import ChatFaceData from "../Services/ChatFaceData";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] = useState(ChatFaceData);
  const [selectedChatFaceData, setSelectedChatFaceData] = useState(ChatFaceData[0]);
  const router = useRouter();  

  useEffect(() => {}, []);

  const onChatFacePress = (id) => {
    setSelectedChatFaceData(ChatFaceData[id - 1]);
  };

  return (
    <View style={{ alignItems: "center", marginTop: 60 }}>
      <Text
        style={{
          color: selectedChatFaceData.primary,
          fontFamily: "default",
          fontSize: 60,
          fontWeight: "bold",
        }}
      >
        Hello
      </Text>

      <Text
        style={{
          color: "black",
          fontSize: 55,
          fontWeight: "bold",
        }}
      >
        i am {selectedChatFaceData.name}
      </Text>

      <Image
        source={{ uri: selectedChatFaceData.image }}
        style={{
          height: 230,
          width: 230,
          padding: 10,
          marginTop: 10,
        }}
      />

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 33,
          color: selectedChatFaceData.primary,
          padding: 20,
          marginLeft: 20,
          alignItems: "center",
        }}
      >
        How can I help you?
      </Text>

      <View style={{ marginTop: 5, alignItems: "center", height: 110 }}>
        <FlatList
          data={chatFaceData}
          horizontal
          showsHorizontalScrollIndicator={false}  
          renderItem={({ item }) =>
            selectedChatFaceData.id !== item.id && (
              <TouchableOpacity style={{ margin: 15 }} onPress={() => onChatFacePress(item.id)}>
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            )
          }
        />
        <Text style={{ marginTop: 5, color: "#B0B0B0", fontSize: 20, fontWeight: "bold" }}>
          Choose Your Chat Bot!!
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/chat")}   
        style={{
          backgroundColor: selectedChatFaceData.primary,
          width: Dimensions.get("screen").width * 0.6,
          borderRadius: 100,
          alignItems: "center",
          marginTop: 30,
          padding: 17,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Chat Now</Text>
      </TouchableOpacity>
    </View>
  );
}
