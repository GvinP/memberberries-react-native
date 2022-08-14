import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./screens/types";
import { Posts } from "./screens/Posts/Posts";
import { Login } from "./screens/Login/Login";
import { Form } from "./screens/Form/Form";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function Main() {
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Posts"} component={Posts} />
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name={"Form"} component={Form} />
    </Stack.Navigator>
  );
}