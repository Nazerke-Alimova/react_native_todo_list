import React, { useState } from "react";
import {StyleSheet,View,TextInput,TouchableOpacity,Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const AddTask = ({ setTasks, tasks }) => {
  const [textInput, setTextInput] = useState();

  const addTask = () => {
    if (textInput && textInput.trim() !== "") {
      const newTasks = [...tasks, textInput];

      setTasks(newTasks);
      setTextInput("");
      Keyboard.dismiss();//для клавиш

    }
  };

  return (
    <View style={styles.addContainer}>
      <TextInput
        style={[styles.textInput, !textInput && styles.centredText]}
        placeholderTextColor="#c0c0c0"
        placeholder=" Write a task"
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
      ></TextInput>
      <TouchableOpacity onPress={addTask}>
        <View style={styles.addBtn}>
          <Icon name="plus" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  addContainer: {
    paddingTop: 10,
    backgroundColor: "#E8EAED",
    flexDirection: "row",
    gap: 20,
    position: "absolute",
    bottom: 36,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    color: "black",
    width: "75%",
  },
  centredText: {
    textAlign: "center",
  },
  addBtn: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 52,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
