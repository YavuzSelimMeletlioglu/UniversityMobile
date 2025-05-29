import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function RootLayout() {
  const { user_id } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <AntDesign
              name="plus"
              size={24}
              color="black"
              onPress={() => router.push("/dashboard/message/students")}
            />
          ),
          headerTitle: "Mesajlar",
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: "",
          headerBackTitle: "Mesajlar",
        }}
      />
      <Stack.Screen
        name="students"
        options={{
          title: "Kişiler",
          headerBackTitle: "Mesajlar",
        }}
        initialParams={{
          user_id: user_id,
        }}
      />
    </Stack>
  );
}
