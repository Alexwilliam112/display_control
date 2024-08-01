import * as React from "react";
import { Image, Text, Pressable } from "react-native";
import styles from "../stylesheets/cardStyles";

export default ArticleCard = ({ setModalVisible, data, setColors, zone }) => {
  function handleClick() {
    const zoneColors = data.zones.find((el) => {
      return el.zone === zone;
    });
    setColors(zoneColors.colors);
    setModalVisible(true);
  }

  const zoneData = data.zones.find((el) => el.zone === zone && el.displayed);
  const isDisplayed = zoneData ? zoneData.displayed : false;

  return (
    <Pressable
      style={isDisplayed ? styles.cardContainerSelected : styles.cardContainer}
      onPress={() => {
        handleClick();
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