import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { ApiResponse, UniversityType } from "@/src/types/apiTypes";
import { useRouter } from "expo-router";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function University() {
  const [courses, setCourses] = useState<UniversityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniversityId, setSelectedUniversityId] = useState<
    number | null
  >(null);
  const instance = APIRequest.INSTANCE();
  const router = useRouter();

  const fetchData = async () => {
    const response = await instance.get<UniversityType[]>("universities");
    if (response && response.success) {
      setCourses(response.data);
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
            params: { university_id: item.id.toString() },
          });
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rows}>{item.name}</Text>
            <Text style={{ color: "#555" }}>{item.description}</Text>
          </View>
          <View style={styles.countContainer}>
            <MaterialIcons name="person" size={20} color="black" />
            <Text> {item.student_count}</Text>
          </View>

          {/* Detay ikonu */}
          <MaterialIcons
            name="info-outline"
            size={24}
            color="#007BFF"
            onPress={() => {
              router.push({
                pathname: "/dashboard/information/university_details",
                params: { university_id: item.id.toString() },
              });
            }}
          />
        </View>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.headerText}>Üniversiteler</Text>}
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
    marginTop: 20,
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
