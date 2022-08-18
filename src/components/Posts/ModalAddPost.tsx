import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MARGIN, PADDING, WIDTH } from "../../constants/constants";
import { useAppNavigation } from "../../screens/types";

type ModalAddPostPropsType = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export function ModalAddPost({
  modalVisible,
  setModalVisible,
}: ModalAddPostPropsType) {
  const navigation = useAppNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AntDesign
            name="close"
            size={20}
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Text style={styles.modalText}>
            Please Sign In to create your own posts and like other's posts
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, styles.buttonSignIn]}
              onPress={() => {
                navigation.navigate("Login")
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Sign In</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: PADDING,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    width: WIDTH / 4,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonSignIn: {
    backgroundColor: "#F194FF",
    marginRight: MARGIN,
  },
  buttonClose: {
    alignSelf: "flex-end",
    marginBottom: MARGIN * 3,
    color: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: PADDING,
    textAlign: "center",
  },
});
