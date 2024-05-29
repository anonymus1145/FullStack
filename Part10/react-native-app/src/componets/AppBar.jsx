import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import authStorage from "../utils/authStorage";
import useTokenStore from "../zustandStore/tokenStore";
import { useQuery } from "@apollo/client";
import query from "../graphql/queries";


const styles = StyleSheet.create({
  container: {
    paddingTop: 10 + Constants.statusBarHeight,
    backgroundColor: "cornsilk",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    color: "black",
  },
});

const AppBar = () => {
  const navigation = useNavigation();
  const { token, setToken } = useTokenStore();

  const { client } = useQuery(query.IS_LOGGED_IN, {
    fetchPolicy: "cache-and-network",
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("RepositoryList")}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
      {token ? (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={async () => {
            if (token) {
              await authStorage.deleteAccesToken();
              setToken();
              client.resetStore();
              navigation.navigate("SignIn");
            }
          }}
        >
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.button}>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
      )}
    </View>
  );
};

export default AppBar;
