import { APIRequest } from "@/src/api/rest";
import { Input } from "@/src/components/Input";
import { ThemedTouchableOpacity } from "@/src/components/TouchableOpacity";
import {
  MessageListType,
  MessageType,
  UniversityType,
} from "@/src/types/apiTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type MessageResponseType = {
  data: MessageType[];
  success: boolean;
};

type FooterProps = {
  sendMessageText: string;
  setSendMessageText: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
};

export default function Messages() {
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sendMessageText, setSendMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const { sender_id, receiver_id } = useLocalSearchParams<{
    sender_id: string;
    receiver_id: string;
    receiver_name: string;
  }>();

  const instance = APIRequest.INSTANCE();

  const fetchData = async () => {
    const response = await instance.post<MessageType[]>(`messages/details`, {
      sender_id: Number(sender_id),
      receiver_id: Number(receiver_id),
    });
    if (response && response.success) {
      setMessages(response.data);
    }
    setMessageSent(false);
    setIsRefreshing(false);
  };

  const sendMessage = () => {
    if (sendMessageText === "") return;
    instance.post("messages/send", {
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: sendMessageText,
    });
    setMessageSent(true);
    setSendMessageText("");
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    messageSent && fetchData();
  }, [messageSent]);

  const renderItem = ({ item }: { item: MessageType }) => {
    return (
      <ThemedTouchableOpacity disabled={true}>
        <Text
          style={[
            styles.rows,
            item.sender_id === Number(sender_id)
              ? { textAlign: "right" }
              : { textAlign: "left" },
          ]}>
          {item.message}
        </Text>
        <Text
          style={[
            { fontSize: 14 },
            item.sender_id === Number(sender_id)
              ? { textAlign: "right" }
              : { textAlign: "left" },
          ]}>
          {new Date(item.send_date).toLocaleString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </ThemedTouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
        }
        style={styles.flatList}
        contentContainerStyle={{ padding: 10 }}
      />
      <Footer
        sendMessageText={sendMessageText}
        sendMessage={sendMessage}
        setSendMessageText={setSendMessageText}
      />
    </View>
  );
}

function Footer({
  sendMessageText,
  setSendMessageText,
  sendMessage,
}: FooterProps) {
  return (
    <View style={styles.footer}>
      <Input
        value={sendMessageText}
        onChangeText={(text) => setSendMessageText(text)}
        placeholder="Mesaj giriniz"
      />
      <Pressable style={styles.sendButton} onPress={sendMessage}></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rows: {
    fontSize: 18,
  },
  flatList: {
    flex: 1,
    height: "100%",
    marginTop: 20,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 15,
    columnGap: 5,
  },
  sendButton: {
    backgroundColor: "green",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
