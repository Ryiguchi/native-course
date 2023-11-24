import { Text, View, StyleSheet } from "react-native";

function MealItemList({ listItems, title }) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        {listItems.map((item, i) => (
          <Text style={styles.listItemText} key={i}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

export default MealItemList;

const textColor = "#e2b497";

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
  },

  innerContainer: {
    width: "80%",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: textColor,
    borderBottomWidth: 2,
    borderBottomColor: textColor,
    padding: 6,
    margin: 4,
  },

  listItemText: {
    color: "#351401",
    backgroundColor: textColor,
    marginTop: 8,
    borderRadius: 6,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
  },
});
