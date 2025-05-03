import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function InformationLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
      }}>
      <Stack.Screen
        name="faculty"
        options={{
          title: "Fakülteler",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => router.navigate("/dashboard")}>
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="#2962FF"
              />
              <Text style={{ color: "rgb(0, 110, 255)", fontSize: 16 }}>
                Üniversiteler
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="department"
        options={{
          title: "Bölümler",
        }}
      />
      <Stack.Screen
        name="course"
        options={{
          title: "Dersler",
        }}
      />
    </Stack>
  );
}
