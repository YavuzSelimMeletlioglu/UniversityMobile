import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { APIRequest } from "@/src/api/rest";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";

type Student = {
  name: string;
  id: number;
};

const Students = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const instance = APIRequest.INSTANCE();

  const fetch = async () => {
    setRefreshing(true);
    const response = await instance.get<Student[]>(
      `messages/students/${user_id}`
    );
    if (response) {
      console.log(response.data);
      if (response.success) {
        setStudents(response.data);
      } else {
        Alert.alert("Uyarı", response.message);
      }
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderItem = ({ item }: { item: Student }) => {
    const capitalize = (str: string): string => {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
    return (
      <ThemedTouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/dashboard/message/messages",
            params: { sender_id: user_id, receiver_id: item.id },
          })
        }>
        <Text style={{ fontSize: 18 }}>{capitalize(item.name)}</Text>
      </ThemedTouchableOpacity>
    );
  };
  return (
    <FlatList
      data={students}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => fetch()} />
      }
    />
  );
};

export default Students;
