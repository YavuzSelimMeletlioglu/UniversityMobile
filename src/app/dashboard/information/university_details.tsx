import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  Image,
} from "react-native";
import { APIRequest } from "@/src/api/rest";
import { UniversityDetail } from "@/src/types/apiTypes";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function UniversityDetails() {
  const [university, setUniversity] = useState<UniversityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { university_id } = useLocalSearchParams<{ university_id: string }>();
  const instance = APIRequest.INSTANCE();

  const fetchData = async () => {
    const response = await instance.get<UniversityDetail>(
      `universities/${university_id}`
    );
    if (response) {
      if (response.success) {
        setUniversity(response.data);
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

  if (university === null) {
    return;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: university.name,
          headerBackVisible: true,
        }}
      />
      {university.description && (
        <Text style={styles.text}>{university.description}</Text>
      )}
      {university.address && (
        <Text style={styles.text}>📍 {university.address}</Text>
      )}
      {university.phone && (
        <Text style={styles.text}>📞 {university.phone}</Text>
      )}
      {university.website && (
        <TouchableOpacity onPress={() => Linking.openURL(university.website)}>
          <Text style={[styles.text, styles.link]}>
            🌐 {university.website}
          </Text>
        </TouchableOpacity>
      )}
      {university.quota !== undefined && (
        <Text style={styles.text}>👥 Kontenjan: {university.quota}</Text>
      )}
      {university.logo && (
        <Image
          source={{ uri: `http://localhost/storage/${university.logo}` }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  link: {
    color: "#007BFF",
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});
