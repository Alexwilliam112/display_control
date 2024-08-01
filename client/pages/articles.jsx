import styles from "../stylesheets/articleStyles";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { useMutation, useQuery } from "@apollo/client";

import { GET_ALL_DISPLAY, GET_ZONES } from "../queries/articles";
import ArticleCard from "../components/card";
import ColorSelection from "../components/modals/colorSelection";

export default ArticlePage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  let { loading, error, data } = useQuery(GET_ALL_DISPLAY);
  const {
    loading: zoneLoading,
    error: zoneError,
    data: zoneData,
  } = useQuery(GET_ZONES);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (zoneData) {
      const zoneDatas = zoneData.getZones.zones;
      const transformedItems = zoneDatas.map(item => ({
        label: item.zoneName,
        value: item.zoneName
      }));
      setItems(transformedItems);
    }
    
  }, [zoneData]);

  useEffect(() => {
    if (data) {
      const articleData = data.GetAllDisplay.activeDisplay;
      setArticles(articleData);
    }
  }, [data]);

  //query
  async function searchArticle() {
    const resp = await searchDispatch({
      variables: { input: { nameOrUsername: searchChar } },
    });

    setArticles(resp.data.GetAllDisplay.activeDisplay);
  }

  //modal settings
  const [modalVisible, setModalVisible] = useState(false);
  const [colors, setColors] = useState([]);

  return (
    <SafeAreaView style={styles.mainPagefinal}>
      <View style={styles.header}>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("home");
          }}
        >
          <Image
            style={styles.headerChild}
            resizeMode="cover"
            source={require("../assets/backButton.png")}
          />
        </Pressable>
        <Text style={styles.displayControl}>Display Control</Text>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate("home");
          }}
        >
          <Image
            style={styles.headerChild}
            resizeMode="cover"
            source={require("../assets/saveButton.png")}
          />
        </Pressable>
      </View>
      <View style={styles.contentBoard}>
        <ColorSelection
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[styles.frameParentdd, styles.parentSpaceBlock1]}
          dropDownContainerStyle={{
            borderColor: "#f3f3f3",
          }}
          textStyle={{
            paddingLeft: 8,
          }}
        />

        <TextInput
          style={[styles.frameParent, styles.parentSpaceBlock1]}
          placeholder="Search Article ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.showingAllArticleParent}></View>

        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text>ERROR FETCHING DATA</Text>
        ) : (
          <FlatList
            style={styles.flatlist}
            data={articles}
            keyExtractor={(item) => item.article}
            numColumns={2}
            renderItem={({ item }) => (
              <ArticleCard setModalVisible={setModalVisible} data={item} />
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
