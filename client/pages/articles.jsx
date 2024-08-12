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
  UPDATE_DISPLAY,
} from "../queries/articles";
import ArticleCard from "../components/card";
import ColorSelection from "../components/modals/colorSelection";
import LoadingModal from "../components/modals/loadingModal";
import cleanupWorker from "../utils/cleanups";
import { invalidateCache } from "../configs/apollo";

export default ArticlePage = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [zone, setZone] = useState(null);
  const [items, setItems] = useState([]);

  //modal settings
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [colors, setColors] = useState([]);

  const [fnDispatch] = useMutation(UPDATE_DISPLAY, {
    awaitRefetchQueries: true,
    onCompleted: () => {
      console.log("COMPLETED ========");
      invalidateCache();
      navigation.navigate("home");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const setLoadingSubmitAsync = () => {
    return new Promise((resolve) => {
      setLoadingSubmit(true);
      // Use a setTimeout to give time for the state to update
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handleSubmit = async () => {
    console.log("STARTING SUBMISSION =============");

    try {
      await setLoadingSubmitAsync();
      console.log("CLEANING UP =============");
      const submission = await cleanupWorker(articles);

      console.log("SUBMITTING =============");
      await fnDispatch({
        variables: {
          input: {
            data: submission,
          },
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const setAllColorsDisplayedToFalse = (articleId, zoneName) => {
    const updatedArticles = articles.map((article) => {
      if (article.article === articleId) {
        return {
          ...article,
          zones: article.zones.map((zone) => {
            if (zone.zone === zoneName) {
              // Set all colors' displayed to false
              const updatedColors = zone.colors.map((color) => ({
                ...color,
                displayed: false,
              }));

              return {
                ...zone,
                colors: updatedColors,
                displayed: false,
              };
            }
            return zone;
          }),
        };
      }
      return article;
    });

    setArticles(updatedArticles);
    data = updatedArticles;
    console.log("All colors and zone set to false");
  };

  const updateColorDisplayed = (articleId, zoneName, colorName, displayed) => {
    const updatedArticles = articles.map((article) => {
      if (article.article === articleId) {
        return {
          ...article,
          zones: article.zones.map((zone) => {
            if (zone.zone === zoneName) {
              // Update the colors array within the zone
              const updatedColors = zone.colors.map((color) => {
                if (color.color === colorName) {
                  return { ...color, displayed };
                }
                return color;
              });

              setColors(updatedColors);
              // Determine the zone's displayed status
              let zoneDisplayed;
              if (displayed) {
                // If setting color to true, set zone displayed to true
                zoneDisplayed = true;
              } else {
                // If setting color to false, check other colors in the zone
                zoneDisplayed = updatedColors.some((color) => color.displayed);
              }

              return {
                ...zone,
                colors: updatedColors,
                displayed: zoneDisplayed,
              };
            }
            return zone;
          }),
        };
      }
      return article;
    });

    setArticles(updatedArticles);
    console.log("Updated Articles");
  };

  let { loading, error, data } = useQuery(GET_ALL_DISPLAY);
  const {
    loading: zoneLoading,
    error: zoneError,
    data: zoneData,
  } = useQuery(GET_ZONES);

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
        <Pressable style={styles.buttonContainer} onPress={handleSubmit}>
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
          zone={zone}
          articleId={selectedArticle}
          updateColorDisplayed={updateColorDisplayed}
          setAllColorsDisplayedToFalse={setAllColorsDisplayedToFalse}
        />
        <LoadingModal loadingSubmit={loadingSubmit} />

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
                setSelectedArticle={setSelectedArticle}
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
