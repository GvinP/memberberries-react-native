import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./screens/types";
import { Posts } from "./screens/Posts/Posts";
import { Login } from "./screens/Login/Login";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function Main() {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Posts"} component={Posts} />
      <Stack.Screen name={"Login"} component={Login} />
    </Stack.Navigator>
  );
}