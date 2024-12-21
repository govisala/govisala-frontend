import { View, Text, StyleSheet } from "react-native";
import React from "react";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text>NotFound</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 96,
  },
});

export default NotFound;
