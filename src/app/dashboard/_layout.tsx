import { Tabs, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

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
      <Tabs.Screen name="index" />
      <Tabs.Screen
        name="message"
        initialParams={{
          student_id: student_id,
        }}
      />
    </Tabs>
  );
}
