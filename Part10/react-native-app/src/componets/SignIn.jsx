import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import { useState } from "react";
import useSignIn from "../hooks/useSignIn";
import authStorage from "../utils/authStorage";
import { useNavigation } from "@react-navigation/native";
import useTokenStore from "../zustandStore/tokenStore";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

const SignIn = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, response] = useSignIn();
  const { token, setToken } = useTokenStore();

  const navigation = useNavigation();

  const onSumbit = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
   
      await signIn({ username, password });

    if (response?.loading) {
      return <Text>Loading...</Text>;
    }

    if (response?.error) {
      setError(response?.error?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    if (response?.data?.authenticate.accessToken) {
      // Use await only if you need the value from the function in the next line
      await authStorage.setAccesToken(
        JSON.stringify(response?.data?.authenticate.accessToken),
      );
    } else {
      setError("Authentication failed");
      setTimeout(() => {
        setError("");
      }, 3000);

      return;
    }

    setUsername("");
    setPassword("");
    setToken();
    console.log("Authenticated successfully");
    navigation.navigate("RepositoryList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{ color: "red", padding: 10 }}>{error}</Text>
      </SafeAreaView>
      <Pressable style={styles.button} onPress={onSumbit}>
        <Text style={styles.text}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
