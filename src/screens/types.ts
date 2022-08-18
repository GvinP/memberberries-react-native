import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PostItem } from "../api/api";

export type RootStackParamsList = {
  Posts: {
    postData: PostItem
  } | undefined;
  Login: undefined;
  Form: {
    postData: PostItem
  } | undefined;
};

export type PostsProps = NativeStackScreenProps<RootStackParamsList, "Posts">;

export type FormProps = NativeStackScreenProps<RootStackParamsList, "Form">;

export type NavigationUseType = NavigationProp<RootStackParamsList>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();
