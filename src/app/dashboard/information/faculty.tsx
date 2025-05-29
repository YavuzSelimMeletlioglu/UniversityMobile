import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { FacultyType } from "@/src/types/apiTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";

export default function Faculty() {
  const [courses, setCourses] = useState<FacultyType[]>([]);
  const [loading, setLoading] = useState(true);

  const { university_id } = useLocalSearchParams<{ university_id: string }>();

  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<FacultyType[]>(
      `universities/${university_id}/faculties`
    );
    if (response) {
      if (response.success) {
        setCourses(response.data);
      } else {
        Alert.alert("Uyarı", response.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(university_id);
    fetchData();
  }, [university_id]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const onRefresh = async () => {
    setLoading(true);
    await fetchData();
  };

  const renderItem = ({ item }: { item: FacultyType }) => {
    return (
      <ThemedTouchableOpacity
        onPress={() =>
          router.push({
            pathname: `./department`,
            params: { faculty_id: item.id.toString() },
          })
        }>
        <Text style={styles.rows}>{item.name}</Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Fakülteler</Text>}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={loading} />
      }
      style={styles.flatList}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    marginTop: 20,
  },
  rows: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
