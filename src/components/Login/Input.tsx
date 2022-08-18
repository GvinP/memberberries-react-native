import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import { WIDTH, MARGIN, PADDING } from "../../constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Dispatch, SetStateAction, useState } from "react";
import { FormDataType } from "../../screens/Login/Login";

type InputPropsType = {
  name: string;
  label: string;
  type?: string;
  autoFocus?: boolean;
  handleChange: Dispatch<SetStateAction<FormDataType>>;
};

export function Input({ name, label, handleChange }: InputPropsType) {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={label}
        onChangeText={(text) =>
          handleChange((prevState) => ({ ...prevState, [name]: text }))
        }
        secureTextEntry={
          name === "password" || name === "confirmPassword"
            ? showPassword
            : false
        }
        autoCorrect={false}
        style={styles.input}
      />
      {(name === "password" || name === "confirmPassword") && (
        <TouchableOpacity
          onPress={() => setShowPassword((prevState) => !prevState)}
          style={styles.icon}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#cecece",
    width: WIDTH - PADDING * 2,
    paddingHorizontal: PADDING / 2,
    height: PADDING,
    marginVertical: MARGIN,
  },
  input: {
    width: WIDTH - PADDING * 4,
  },
  icon: {},
});
