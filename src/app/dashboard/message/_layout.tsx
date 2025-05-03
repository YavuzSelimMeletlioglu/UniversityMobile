import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Mesajlar",
        }}
      />
      <Stack.Screen
        name="messages"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: "",
          headerBackTitle: "Giriş",
        }}
      />
    </Stack>
  );
}
