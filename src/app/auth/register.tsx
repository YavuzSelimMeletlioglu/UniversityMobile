import { APIRequest } from "@/src/api/rest";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const instance = APIRequest.INSTANCE();

  const register = async () => {
    const reqData = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      university_name: universityName,
      department_name: departmentName,
    };
    const result = await instance.post("register", reqData);
    if (result.success) {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input placeholder="Adınız" onChangeText={(text) => setName(text)} />
      <Input
        placeholder="Soyadınız"
        onChangeText={(text) => setSurname(text)}
      />
      <Input
        placeholder="Okuduğunuz Üniversite"
        onChangeText={(text) => setUniversityName(text)}
      />
      <Input
        placeholder="Okuduğunuz Bölüm"
        onChangeText={(text) => setDepartmentName(text)}
      />
      <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input placeholder="Şifre" onChangeText={(text) => setPassword(text)} />
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
});
