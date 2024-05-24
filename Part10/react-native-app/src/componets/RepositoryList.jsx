import { FlatList, View, StyleSheet, Text } from "react-native";
import RepositoryItem from "./RepositoryItem";
//import { useState, useEffect } from "react";
import useRepositories from "../hooks/useRepositories";

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

  if (!repositoriesNodes) {
    console.log("Repositories in the list: ", repositoriesNodes);
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (repositoriesNodes.length === 0) {
    return <Text>No repositories found!</Text>;
  }  

  return (
    <FlatList
      style={styles.container}
      data={repositoriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
