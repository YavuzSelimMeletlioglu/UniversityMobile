import { APIRequest } from "@/src/api/rest";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";
import { MessageListType, UniversityType } from "@/src/types/apiTypes";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type MessageListResponseType = {
  data: MessageListType[];
  success: boolean;
};

export default function Messages() {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [receivers, setReceivers] = useState<MessageListType[]>([]);
  const { student_id } = useGlobalSearchParams<{ student_id: string }>();

  const instance = APIRequest.INSTANCE();

  const fetchData = async () => {
    const response = await instance.get<MessageListResponseType>(
      `messages/${student_id}`
    );

    if (response && response.success) {
      setReceivers(response.data);
    }
    setIsRefreshing(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }: { item: MessageListType }) => {
    return (
      <ThemedTouchableOpacity
        onPress={() => {
          router.push({
            pathname: `./message/messages`,
            params: { sender_id: student_id, receiver_id: item.receiver_id },
          });
        }}>
        <Text style={styles.rows}>{item.name}</Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <FlatList
      data={receivers}
      keyExtractor={(item) => item.receiver_id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
      }
      style={styles.flatList}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  rows: {
    fontSize: 18,
  },
  flatList: {
    flex: 1,
    marginTop: 20,
  },
});
