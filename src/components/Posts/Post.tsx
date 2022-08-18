import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { PostItem } from "../../api/api";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";
import moment from "moment";
import { useEffect, useState } from "react";
import { AuthDataType } from "../../../store/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../../store/store";
import { deletePost, likePost } from "../../../store/postsReducer";
import { useAppNavigation } from "../../screens/types";

type PostPropsType = {
  item: PostItem;
};

export function Post({ item }: PostPropsType) {
  const dispatch = useAppDispatch();
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

  return (
    <View>
      <View style={styles.postHeader}>
        <Text>{item.name}</Text>
        <Text>{moment(item.createdAt).fromNow()}</Text>
        {item.author === user.result?._id && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Form", { postData: item })}
          >
            <Entypo name="dots-three-horizontal" size={24} />
          </TouchableOpacity>
        )}
      </View>

      <Image source={{ uri: item.selectedFile }} style={styles.image} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: PADDING,
          marginVertical: MARGIN,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            disabled={!user.result?._id}
            onPress={() => dispatch(likePost(item._id!))}
          >
            {item.likes.includes(user.result?._id) ? (
              <AntDesign name="like1" size={24} style={styles.button} />
            ) : (
              <AntDesign
                name="like2"
                size={24}
                style={user.result?._id ? styles.button : styles.disable}
              />
            )}
          </TouchableOpacity>
          <Text
            style={[
              user.result?._id ? styles.button : styles.disable,
              { marginLeft: MARGIN },
            ]}
          >
            {item.likes.length} likes
          </Text>
        </View>
        {item.author === user.result?._id && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => dispatch(deletePost(item._id!))}>
              <MaterialIcons name="delete-outline" size={24} />
            </TouchableOpacity>
            <Text style={{ marginLeft: MARGIN / 2 }}>delete</Text>
          </View>
        )}
      </View>
      <View style={{ paddingHorizontal: PADDING }}>
        <Text style={{ fontSize: 26, fontWeight: "600", marginBottom: MARGIN }}>
          {item.title}
        </Text>
        <Text style={{ marginBottom: MARGIN }}>{item.message}</Text>
        <Text style={{ marginBottom: MARGIN }}>
          {item.tags.map((tag) => `#${tag}`).join(" ")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    marginVertical: MARGIN,
    alignItems: "center",
  },
  image: {
    width: WIDTH,
    height: WIDTH,
  },
  button: {
    color: "tomato",
  },
  disable: {
    color: "#cecece",
  },
});
