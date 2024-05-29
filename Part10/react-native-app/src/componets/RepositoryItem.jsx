import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import useRepository from "../hooks/useRepository";
import BasicButton from "./BasicButton";
import * as Linking from "expo-linking";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: "ghostwhite",
    borderRadius: 10,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
    gap: 5,
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    color: "#666",
  },
  language: {
    color: "white",
    backgroundColor: "dodgerblue",
    padding: 5,
    alignSelf: "flex-start",
  },
  alignComponents: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  otherComponents: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  otherComponentsText: {
    gap: 5,
    alignItems: "center",
  },
  singleRepository: {
    flex: 0.3,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ item, route }) => {
  if (typeof item === "object") {
    return (
      <View testID="repositoryItem" style={styles.container}>
        <View style={styles.alignComponents}>
          <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.fullName}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.language}>{item.language}</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.otherComponents}>
          <View style={styles.otherComponentsText}>
            <Text style={styles.title}>
              {item.stargazersCount > 1000
                ? `${Math.round(item.stargazersCount / 1000)}k`
                : item.stargazersCount}
            </Text>
            <Text>Stars</Text>
          </View>
          <View style={styles.otherComponentsText}>
            <Text style={styles.title}>
              {item.forksCount > 1000
                ? `${Math.round(item.forksCount / 1000)}k`
                : item.forksCount}
            </Text>
            <Text>Forks</Text>
          </View>
          <View style={styles.otherComponentsText}>
            <Text style={styles.title}>{item.reviewCount}</Text>
            <Text>Reviews</Text>
          </View>
          <View style={styles.otherComponentsText}>
            <Text style={styles.title}>{item.ratingAverage}</Text>
            <Text>Rating</Text>
          </View>
        </View>
      </View>
    );
  } else {
    const id = route.params.id;
    const { data, loading, error } = useRepository({ id });

    if (loading) {
      return <Text>Loading...</Text>;
    }
    if (error) {
      return <Text>Error: {error}</Text>;
    }
    if (data) {
      const onPress = () => {
        Linking.openURL(data.repository.url);
      };

      const reviews =
        data.repository.reviews.edges.map((edge) => edge.node) || [];

      return (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.singleRepository}>
              <RepositoryItem item={data.repository} />
              <BasicButton name="View on Github" onPress={onPress} />
              <BasicButton name="Write a review" onPress={() => console.log("Write a review")} />
            </View>
          )}
        />
      );
    }

    return <Text>No data...</Text>;
  }
};

export default RepositoryItem;
