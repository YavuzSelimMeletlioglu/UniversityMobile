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
import { CourseType } from "@/src/types/apiTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";

export default function Course() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  const { department_id } = useLocalSearchParams<{ department_id: string }>();

  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<CourseType[]>(
      `departments/${department_id}/courses`
    );
    if (response) {
      if (response.success) {
        console.log(response.data);
        setCourses(response.data);
      } else {
        Alert.alert("Uyarı", response.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [department_id]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const onRefresh = async () => {
    setLoading(true);
    await fetchData();
  };

  const renderItem = ({ item }: { item: CourseType }) => {
    return (
      <ThemedTouchableOpacity
        onPress={() =>
          router.push({
            pathname: `./${item.id}`,
            params: { course_code: item.code },
          })
        }>
        <Text style={styles.rows}>
          {item.code}: {item.name}
        </Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Courses</Text>}
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
