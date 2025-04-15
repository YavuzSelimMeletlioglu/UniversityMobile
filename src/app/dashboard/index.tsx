import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { UniversityType } from "@/src/types/apiTypes";
import { useRouter } from "expo-router";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";

export default function University() {
  const [courses, setCourses] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState(true);
  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<UniversityType[]>("universities");
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

  const renderItem = ({ item }: { item: UniversityType }) => {
    return (
      <ThemedTouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/dashboard/information/faculty",
            params: { university_id: item.university_id.toString() },
          });
        }}>
        <View style={styles.countContainer}>
          <View style={styles.circle} />
          <Text> {item.student_count}</Text>
        </View>
        <Text style={styles.rows}>
          {item.name}: {item.description}
        </Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.university_id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Universiteler</Text>}
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
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
});
