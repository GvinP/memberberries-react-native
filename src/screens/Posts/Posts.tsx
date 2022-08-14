import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { PostItem } from "../../api/api";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";
import { posts4 } from "../../constants/posts";
import { Post } from "../../components/Posts/Post";
import { Header } from "../../components/Posts/Header";
import SafeAreaView from "react-native-safe-area-view";
import { Search } from "../../components/Posts/Search";

export function Posts() {
  const [posts, setPosts] = useState<any>(posts4.data);
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    //   api.getAllPosts(1).then(res=>setPosts(res.data))
  }, []);

  const render: ListRenderItem<PostItem> = ({ item }) => <Post item={item} />;
  const renderSeparator = () => <View style={styles.separator} />;
  const renderHeader = () =>
    showSearch ? (
      <Search setShowSearch={setShowSearch} />
    ) : (
      <Header setShowSearch={setShowSearch} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={render}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: MARGIN,
    backgroundColor: "#cecece",
    marginVertical: MARGIN,
  },
});
