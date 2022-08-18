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
import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { searchPost } from "../../../store/postsReducer";

type SearchPropsType = {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
};

export function Search({ setShowSearch }: SearchPropsType) {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => dispatch(searchPost(search))}>
        <Ionicons name="search-outline" size={34} />
      </TouchableOpacity>
      <TextInput style={styles.input} value={search} onChangeText={setSearch} />
      <Pressable
        onPress={() => {
          searchPost("");
          setShowSearch(false);
        }}
      >
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
    borderWidth: 1,
    backgroundColor: "#cecece",
  },
});
