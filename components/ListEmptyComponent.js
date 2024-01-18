import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import colors from "../constants/colors";
import NoMoney from "../assets/no money.svg";

export default function ListEmptyComponent() {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <NoMoney width={width} height={height * 0.7} opacity={0.4} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>No Expenses</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.blue.lighter,
    fontSize: 24,
  },
});
