import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RepositoryList"
          component={RepositoryList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Main;
