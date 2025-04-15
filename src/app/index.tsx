import { Redirect, useRouter } from "expo-router";

export default function Auth() {
  const router = useRouter();

  return <Redirect href={"/auth/login"} />;
}
