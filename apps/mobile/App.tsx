import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { BottomNav, TabType } from './src/components/BottomNav';
import { HomeScreen } from './src/screens/HomeScreen';
import { TasksScreen } from './src/screens/TasksScreen';
import { MessagesScreen } from './src/screens/MessagesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'explore':
        return <HomeScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#0f172a" />
      <View style={styles.content}>{renderActiveScreen()}</View>
      <BottomNav activeTab={activeTab} onTabSelect={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
});
