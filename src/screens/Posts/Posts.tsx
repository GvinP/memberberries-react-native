import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { api, PostItem } from "../../api/api";
import { HEIGHT, MARGIN, PADDING, WIDTH } from "../../constants/constants";
import { Post } from "../../components/Posts/Post";
import { Header } from "../../components/Posts/Header";
import SafeAreaView from "react-native-safe-area-view";
import { Search } from "../../components/Posts/Search";
import { PostsProps, useAppNavigation } from "../types";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getAllPosts, getFirstPagePosts } from "../../../store/postsReducer";

const START_PAGE = 1;
const POSTS_LIMIT = 4;

export function Posts({ route }: PostsProps) {
  const [showSearch, setShowSearch] = useState(false);
  const posts = useAppSelector((state) => state.posts.allPosts);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!showSearch) {
      dispatch(getFirstPagePosts());
    }
  }, [showSearch]);

  const render: ListRenderItem<PostItem> = ({ item }) => <Post item={item} />;

  const renderSeparator = () => <View style={styles.separator} />;
  const renderHeader = () =>
    showSearch ? (
      <Search
        setShowSearch={setShowSearch}
        search={search}
        setSearch={setSearch}
      />
    ) : (
      <Header setShowSearch={setShowSearch} />
    );
  const onEndReached = () => {
    if (!showSearch) {
      dispatch(getAllPosts(START_PAGE + posts.length / POSTS_LIMIT));
    }
  };

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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  separator: {
    height: MARGIN,
    backgroundColor: "#cecece",
    marginVertical: MARGIN,
  },
});
