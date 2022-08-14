import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Input } from "../../components/Login/Input";
import { WIDTH, MARGIN, PADDING } from "../../constants/constants";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function Login() {
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      {isSignUp && (
        <View>
          <Input label="First Name" name="firstName" />
          <Input label="Last Name" name="lastName" />
        </View>
      )}
      <Input label="Email Adress" name="emailAdress" />
      <Input label="Password" name="password" />
      {isSignUp && <Input label="Confirm Password" name="confirmPassword" />}
      <Pressable onPress={() => {}} style={styles.signInButton}>
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
