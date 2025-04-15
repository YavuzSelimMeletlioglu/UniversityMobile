import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = {
  children: React.ReactNode;
} & TouchableOpacityProps;

export function ThemedTouchableOpacity({ children, ...props }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
});
