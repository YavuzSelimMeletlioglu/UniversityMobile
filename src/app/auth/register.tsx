import { APIRequest } from "@/src/api/rest";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { DepartmentType, UniversityType } from "@/src/types/apiTypes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [universities, setUniversities] = useState<UniversityType[]>([]);
  const [departments, setDepartments] = useState<DepartmentType[]>([]);
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityType>();
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentType>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [universityModalVisible, setUniversityModalVisible] = useState(false);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);

  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const register = async () => {
    const reqData = {
      name,
      surname,
      email,
      password,
      university_name: selectedUniversity?.name,
      department_name: selectedDepartment?.name,
    };
    const result = await instance.post("register", reqData);
    if (result && result.success) {
      router.back();
    }
  };

  const fetchUniversities = async () => {
    const response = await instance.get(`universities`);
    setUniversities(response?.data);
  };

  const fetchDepartments = async (university_id: number) => {
    const response = await instance.get(`departments/uni/${university_id}`);
    setDepartments(response?.data);
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      fetchDepartments(selectedUniversity.id);
      setSelectedDepartment(undefined);
    }
  }, [selectedUniversity]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input placeholder="Adınız" onChangeText={setName} />
      <Input placeholder="Soyadınız" onChangeText={setSurname} />

      {/* Üniversite seçimi */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setUniversityModalVisible(true)}>
          <Text style={styles.dropdownButtonText}>
            {selectedUniversity
              ? selectedUniversity.name
              : "Üniversite seçiniz"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Üniversite Modal */}
      <Modal visible={universityModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={universities}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedUniversity(item);
                    setUniversityModalVisible(false);
                  }}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="Kapat"
              onPress={() => setUniversityModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Bölüm seçimi */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => {
            if (departments.length > 0) {
              setDepartmentModalVisible(true);
            }
          }}>
          <Text style={styles.dropdownButtonText}>
            {selectedDepartment ? selectedDepartment.name : "Bölüm seçiniz"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bölüm Modal */}
      <Modal visible={departmentModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={departments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedDepartment(item);
                    setDepartmentModalVisible(false);
                  }}>
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button
              title="Kapat"
              onPress={() => setDepartmentModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Input placeholder="Email" onChangeText={setEmail} />
      <Input placeholder="Şifre" onChangeText={setPassword} />
      <Button title="Kaydet" onPress={register} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  dropdownContainer: {
    width: "90%",
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#999",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#666",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
  },
});
