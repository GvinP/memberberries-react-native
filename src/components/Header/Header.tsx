import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MARGIN, PADDING, WIDTH } from "../../constants/constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

export function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/berry.png")}
        style={{ width: 40, height: 40 }}
      />
      <TouchableOpacity>
        <Ionicons name="search-outline" size={34} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="pluscircleo" size={28} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, marginRight: MARGIN }}>Login</Text>
        <TouchableOpacity>
          <Ionicons name="log-in-outline" size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: MARGIN * 2,
    paddingHorizontal: PADDING,
  },
  separator: {
    height: MARGIN,
    backgroundColor: "#cecece",
    marginVertical: MARGIN,
  },
});
