import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  Image,
  TouchableOpacity,
} from "react-native";
import { api, PostItem } from "../../api/api";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";

export function Posts() {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
      api.getAllPosts(1).then(res=>setPosts(res.data))

    return () => {};
  }, []);

  const render: ListRenderItem<PostItem> = ({ item }) => {
    return (
      <View>
        <View style={styles.postHeader}>
          <Text>{item.name}</Text>
          <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={24} />
          </TouchableOpacity>
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
          <TouchableOpacity>
            {item.likes.includes(item._id) ? (
              <AntDesign name="like1" size={24} />
            ) : (
              <AntDesign name="like2" size={24} />
            )}
          </TouchableOpacity>
            <Text style={{ marginLeft: MARGIN / 2 }}>likes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <MaterialIcons name="delete-outline" size={24} />
          </TouchableOpacity>
            <Text style={{ marginLeft: MARGIN / 2 }}>delete</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: PADDING}}>
          <Text style={{ fontSize: 26, fontWeight: "600", marginBottom: MARGIN }}>{item.title}</Text>
          <Text style={{ marginBottom: MARGIN }}>{item.message}</Text>
          <Text style={{}}>{item.tags.map((tag) => `#${tag}`).join(" ")}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        {/* <Text>{JSON.stringify(posts.map(el=>el.title))}</Text> */}
      <FlatList data={posts} renderItem={render} />
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
});
