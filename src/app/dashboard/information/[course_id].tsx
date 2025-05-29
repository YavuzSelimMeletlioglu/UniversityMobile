import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { CourseDetailsType } from "@/src/types/apiTypes";
import { APIRequest } from "@/src/api/rest";

type RowProps = {
  rowNameText: string;
  dataText: string;
};

export default function CourseDetailScreen() {
  const [courseDetail, setCourseDetail] = useState<CourseDetailsType | null>(
    null
  );
  const [refreshing, setRefreshing] = useState(true);
  const { course_id, course_code } = useLocalSearchParams<{
    course_id: string;
    course_code: string;
  }>();
  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const fetchData = async () => {
    const response = await instance.get<CourseDetailsType>(
      `/courses/${course_id}`
    );
    if (response) {
      if (response.success) {
        setCourseDetail(response.data);
      } else {
        Alert.alert("Uyarı", response.message);
      }
      console.log(response.data);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [course_id]);

  if (refreshing) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (!courseDetail) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Stack.Screen
          options={{
            headerTitle: "",
          }}
        />
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Kurs Detaylarına Erişilemedi
        </Text>
        <Button title="Kurs Sayfasına Dönünüz" onPress={() => router.back()} />
      </View>
    );
  }

  const Row = ({ rowNameText, dataText }: RowProps) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.rowName}>{rowNameText} :</Text>
        <Text style={styles.text} numberOfLines={3}>
          {dataText}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: course_code,
        }}
      />
      <Text style={styles.header}>{courseDetail.name}</Text>
      {courseDetail.lecturer && (
        <Row rowNameText="Eğitmen" dataText={courseDetail.lecturer} />
      )}
      {courseDetail.schedule && (
        <Row rowNameText="Takvim" dataText={courseDetail.schedule} />
      )}
      {courseDetail.text_book && (
        <Row rowNameText="Yardımcı Kaynak" dataText={courseDetail.text_book} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    rowGap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    columnGap: 5,
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rowName: {
    fontWeight: "700",
    marginLeft: 20,
  },
  text: {
    fontSize: 15,
    flexShrink: 1,
  },
});
