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
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import {
  GET_ALL_DISPLAY,
  GET_ZONES,
  SEARCH_DISPLAY,
} from "../queries/articles";
import ArticleCard from "../components/card";
import ColorSelection from "../components/modals/colorSelection";

export default ArticlePage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState(null);
  const [items, setItems] = useState([]);

  //modal settings
  const [modalVisible, setModalVisible] = useState(false);
  const [colors, setColors] = useState([]);

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
      setZone(zoneDatas[0].zoneName);
      const transformedItems = zoneDatas.map((item) => ({
        label: item.zoneName,
        value: item.zoneName,
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
  const [searchDispatch] = useLazyQuery(SEARCH_DISPLAY);

  async function handleSearch() {
    const resp = await searchDispatch({
      variables: { input: { keyword: searchQuery } },
    });

    setArticles(resp.data.SearchDisplay.activeDisplay);
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

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
          colors={colors}
        />

        <DropDownPicker
          open={open}
          value={zone}
          items={items}
          setOpen={setOpen}
          setValue={setZone}
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
              <ArticleCard
                setModalVisible={setModalVisible}
                data={item}
                setColors={setColors}
                zone={zone}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
