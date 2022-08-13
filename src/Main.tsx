import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./screens/types";
import { Posts } from "./screens/Posts/Posts";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function Main() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Posts"} component={Posts} />
    </Stack.Navigator>
  );
}