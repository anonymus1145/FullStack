import { FlatList, View, StyleSheet, Text, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
//import { useState, useEffect } from "react";
import useRepositories from "../hooks/useRepositories";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "lightgray",
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositoriesNodes, loading, error } = useRepositories();
  const navigation = useNavigation();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }


  return (
    <FlatList
      style={styles.container}
      data={repositoriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("RepositoryItem", { id: item.id} )}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
