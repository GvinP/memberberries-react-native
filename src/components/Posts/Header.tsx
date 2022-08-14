import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MARGIN, PADDING, WIDTH } from "../../constants/constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppNavigation } from "../../screens/types";
import { Dispatch, SetStateAction } from "react";

type HeaderPropsType = {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export function Header({ setShowSearch }: HeaderPropsType) {
  const navigation = useAppNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/berry.png")}
        style={{ width: 30, height: 30, borderColor: "tomato", borderWidth: 1 }}
      />
      <TouchableOpacity onPress={() => setShowSearch(true)}>
        <Ionicons name="search-outline" size={34} />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="pluscircleo" size={28} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 16, marginRight: MARGIN }}>Login</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    borderColor: "tomato",
    borderWidth: 1,
  },
  separator: {
    height: MARGIN,
    backgroundColor: "#cecece",
    marginVertical: MARGIN,
  },
});
