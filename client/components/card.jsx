import * as React from "react";
import { useState, useEffect } from "react";
import { Image, Text, Pressable } from "react-native";
import styles from "../stylesheets/cardStyles";

export default ArticleCard = ({
  setModalVisible,
  data,
  setColors,
  zone,
  setSelectedArticle,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    const zoneData = data.zones.find((el) => el.zone === zone && el.displayed);
    setIsDisplayed(zoneData ? zoneData.displayed : false);
  }, [data, zone]);

  function handleClick() {
    const zoneColors = data.zones.find((el) => {
      return el.zone === zone;
    });
    setColors(zoneColors.colors);
    setSelectedArticle(data.article);
    setModalVisible(true);
  }

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