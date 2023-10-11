import { useState, useEffect } from "react";
import {StyleSheet,Text,
View, SafeAreaView,
KeyboardAvoidingView,FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AddTask from "./components/AddTask/AddTask";
import Task from "./components/Task/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const storage = await AsyncStorage.getItem("tasks");
      if (storage) {
        setTasks(JSON.parse(storage));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    })();
  }, [tasks]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.title}>Today's tasks</Text>
          <View style={styles.taskContainer}>
            <FlatList
              style={styles.tasksBox}
              data={tasks}
              renderItem={({ item, index }) => (
                <Task
                  index={index}
                  taskText={item}
                  setTasks={setTasks}
                  tasks={tasks}
                />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
        <KeyboardAvoidingView>
          <AddTask tasks={tasks} setTasks={setTasks}></AddTask>
        </KeyboardAvoidingView>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tasksBox: {
    height: "85%",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 94,
    gap: 30,
    backgroundColor: "#E8EAED",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  taskContainer: {
    gap: 20,
  },
  tasksWrapper: {
    gap: 20,
  },
});
