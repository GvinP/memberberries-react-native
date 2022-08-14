import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { WIDTH, MARGIN, PADDING } from "../../constants/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Dispatch, SetStateAction } from "react";

type SearchPropsType = {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export function Search({ setShowSearch }: SearchPropsType) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="search-outline" size={34} />
      </TouchableOpacity>
      <TextInput style={styles.input} />
      <Pressable onPress={() => setShowSearch(false)}>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: MARGIN,
    paddingHorizontal: PADDING,
    backgroundColor: "#ffffff",
    borderColor: "tomato",
    borderWidth: 1,
  },
  input: { 
    width: WIDTH / 2, 
    borderColor: "tomato", 
    borderWidth: 1 ,
    backgroundColor: '#cecece'
},
});
