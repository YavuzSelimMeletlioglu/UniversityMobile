import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
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
      `courses/${department_id}`
    );
    if (response) {
      setCourses(response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            pathname: `./${item.course_id}`,
            params: { course_code: item.course_code },
          })
        }>
        <Text style={styles.rows}>
          {item.course_code}: {item.course_name}
        </Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.course_id.toString()}
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
