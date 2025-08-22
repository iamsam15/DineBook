import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "../../assets/Colors";
import { Ionicons } from "@expo/vector-icons";
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveColor: Colors.dark.text,
        tabBarStyle: {
          backgroundColor: Colors.SECONDARY,
          paddingBottom: 14,
          paddingTop: 4,
          height: 65,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="restaurant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
