import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { MARGIN, PADDING, WIDTH } from "../../constants/constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppNavigation } from "../../screens/types";
import { Dispatch, SetStateAction, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AuthDataType } from "../../../store/authReducer";
import { ModalAddPost } from "./ModalAddPost";

type HeaderPropsType = {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
};

export function Header({ setShowSearch }: HeaderPropsType) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useAppNavigation();
  const [user, setUser] = useState<AuthDataType>({} as AuthDataType);
  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        alert(e);
      }
    };
    getData();
  }, [user]);

  const logout = async () => {
    await AsyncStorage.setItem("userData", JSON.stringify({}));
    setUser({} as AuthDataType);
  };

  const addPost = () => {
    if (user?.result?.name) {
      navigation.navigate("Form");
    } else {
      setModalVisible(true);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/berry.png")}
        style={{ width: 30, height: 30 }}
      />
      <TouchableOpacity onPress={() => setShowSearch(true)}>
        <Ionicons name="search-outline" size={34} />
      </TouchableOpacity>
      <TouchableOpacity onPress={addPost}>
        <AntDesign name="pluscircleo" size={28} />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {user?.result?.name ? (
          <Text style={styles.name}>{user?.result?.name.split(" ")[0]}</Text>
        ) : (
          <Text style={styles.name}>Login</Text>
        )}
        {user?.result?.name ? (
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={34} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons name="log-in-outline" size={34} />
          </TouchableOpacity>
        )}
      </View>
      <ModalAddPost
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    width: WIDTH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: MARGIN,
    paddingHorizontal: PADDING,
    backgroundColor: "#ffffff",
  },
  name: {
    fontSize: 16,
    marginRight: MARGIN,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
