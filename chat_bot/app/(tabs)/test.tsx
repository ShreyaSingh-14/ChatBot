import React from 'react';
import TestPage from './../../App_new/Pages/TestPage';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Test() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TestPage />
    </GestureHandlerRootView>
  );
}
