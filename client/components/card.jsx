import * as React from "react";
import { Image, Text, Pressable } from "react-native";
import styles from "../stylesheets/cardStyles";

export default ArticleCard = ({ setModalVisible, data }) => {
  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require("../assets/sampleArticle.png")}
      />
      <Text style={styles.articleNumber}>{data.article}</Text>
    </Pressable>
  );
};
