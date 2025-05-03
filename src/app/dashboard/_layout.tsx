import { Tabs, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const { student_id } = useLocalSearchParams<{ student_id: string }>();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="information"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Üniversiteler",
          tabBarIcon: () => (
            <MaterialIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        initialParams={{
          student_id: student_id,
        }}
        options={{
          tabBarLabel: "Mesajlar",
          tabBarIcon: () => (
            <MaterialIcons name="message" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
