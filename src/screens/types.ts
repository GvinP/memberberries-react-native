import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamsList = {
  Posts: undefined;
  Login: undefined;
};

// export type CurrentPostProps = NativeStackScreenProps<RootStackParamsList, "CurrentPost">;

export type NavigationUseType = NavigationProp<RootStackParamsList>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();
