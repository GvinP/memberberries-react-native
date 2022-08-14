import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from "react-native";
import { api, PostItem } from "../../api/api";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";
import { Post } from "../../components/Posts/Post";
import { Header } from "../../components/Posts/Header";
import SafeAreaView from "react-native-safe-area-view";
import { Search } from "../../components/Posts/Search";
import { PostsProps } from "../types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getAllPosts } from "../../../store/postsReducer";

const START_PAGE = 1;
const POSTS_LIMIT = 4;

export function Posts({ route }: PostsProps) {
  // const [posts, setPosts] = useState<PostItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  // const [isRefresing, setIsRefresing] = useState(false);
  const posts = useAppSelector((state) => state.posts.allPosts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllPosts(START_PAGE));

    // if(route.params?.postData)
    // setPosts([...posts, route.params.postData])
  }, []);

  const render: ListRenderItem<PostItem> = ({ item }) => <Post item={item} />;
  const renderSeparator = () => <View style={styles.separator} />;
  const renderHeader = () =>
    showSearch ? (
      <Search setShowSearch={setShowSearch} />
    ) : (
      <Header setShowSearch={setShowSearch} />
    );
  const onEndReached = () => {
    dispatch(getAllPosts(START_PAGE + posts.length / POSTS_LIMIT));
  };
  // const onRefresh = () => {
  //   setIsRefresing(true);
  //   dispatch(getAllPosts(START_PAGE));
  //   setIsRefresing(false);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={render}
        keyExtractor={(item) => item._id!}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={<ActivityIndicator size={"large"} />}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        
        // refreshing={isRefresing}
        // onRefresh={onRefresh}
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
