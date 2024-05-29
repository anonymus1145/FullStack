import { View, Text, Image, StyleSheet } from "react-native";

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

  alignComponents: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.alignComponents}>
        <View style={styles.circle}>
        <Text style={styles.image}>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{review.user.username}</Text>
          <Text >{review.createdAt}</Text>
          <Text style={styles.description}>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewItem;
