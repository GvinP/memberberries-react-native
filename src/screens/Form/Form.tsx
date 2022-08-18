import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { WIDTH, MARGIN, PADDING } from "../../constants/constants";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { PostItem } from "../../api/api";
import { FormProps, useAppNavigation } from "../types";
import Feather from "react-native-vector-icons/Feather";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addPost, updatePost } from "../../../store/postsReducer";
import { AuthDataType } from "../../../store/authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const postDataInitialState = {
  title: "",
  message: "",
  tags: [] as string[],
  selectedFile: "",
  likes: [] as string[],
  comments: [] as string[],
};

export function Form({ route }: FormProps) {
  const [postData, setPostData] = useState<PostItem>(postDataInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    route.params?.postData._id
      ? state.posts.allPosts.find(
          (post) => post._id === route.params?.postData._id
        )
      : null
  );
  const [user, setUser] = useState<AuthDataType>({} as AuthDataType);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [user]);

  const pickImage = async () => {
    setIsLoading(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setPostData({
        ...postData,
        selectedFile: "data:image/jpeg;base64," + result.base64,
      });
    }
    setIsLoading(true);
  };

  const onSubmit = async () => {
    if (route.params?.postData._id) {
      dispatch(
        updatePost({
          id: route.params?.postData._id,
          post: { ...postData, name: user.result?.name },
        })
      );
    } else {
      dispatch(addPost({ ...postData, name: user.result?.name }));
    }
    navigation.navigate("Posts", { postData });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          value={postData.title}
          placeholder="Title"
          style={styles.input}
          onChangeText={(text) => setPostData({ ...postData, title: text })}
        />
        <TextInput
          value={postData.message}
          placeholder="Message"
          style={styles.input}
          onChangeText={(text) => setPostData({ ...postData, message: text })}
        />
        <TextInput
          value={postData.tags.join(",")}
          placeholder="Tags"
          style={styles.input}
          onChangeText={(text) =>
            setPostData({ ...postData, tags: [...text.split(",")] })
          }
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text>Choose file</Text>
          {isLoading && (
            <Feather
              name="check-circle"
              size={20}
              style={{
                position: "absolute",
                left: WIDTH - PADDING * 2 - MARGIN * 3,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cecece",
    width: WIDTH - PADDING * 2,
    paddingHorizontal: PADDING / 2,
    height: PADDING,
    marginVertical: MARGIN,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    width: WIDTH - PADDING * 2,
    height: PADDING,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: MARGIN,
  },
});
