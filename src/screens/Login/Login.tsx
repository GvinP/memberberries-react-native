import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Input } from "../../components/Login/Input";
import { WIDTH, MARGIN, PADDING } from "../../constants/constants";
import { login, registration } from "../../../store/authReducer";
import { useAppNavigation } from "../types";
import { useAppDispatch } from "../../../store/store";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type FormDataType = typeof initialState

export function Login() {
  const navigation = useAppNavigation()
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async () => {
    if (isSignUp) {
      await dispatch(registration(formData))
    } else {
      await dispatch(login(formData))
    }
    navigation.navigate("Posts")
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      {isSignUp && (
        <View>
          <Input label="First Name" name="firstName" handleChange={setFormData}/>
          <Input label="Last Name" name="lastName" handleChange={setFormData}/>
        </View>
      )}
      <Input label="Email Adress" name="email" handleChange={setFormData}/>
      <Input label="Password" name="password" handleChange={setFormData}/>
      {isSignUp && <Input label="Confirm Password" name="confirmPassword" handleChange={setFormData}/>}
      <Pressable onPress={handleSubmit} style={styles.signInButton}>
        <Text>{isSignUp ? "Sign Up" : "Sign In"}</Text>
      </Pressable>
      <Pressable
        onPress={() => setIsSignUp(prevState=>!prevState)}
        style={styles.switchModeButton}
      >
        <Text>
          {isSignUp
            ? "Already have an account? Sign In"
            : "Dont't have an account? Sign Up"}
        </Text>
      </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  signInButton: {
    backgroundColor: "lightblue",
    width: WIDTH - PADDING * 2,
    height: PADDING,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: MARGIN,
  },
  switchModeButton: {
    backgroundColor: "lightgray",
    width: WIDTH - PADDING * 2,
    height: PADDING,
    justifyContent: "center",
    alignItems: "center",
  },
});
