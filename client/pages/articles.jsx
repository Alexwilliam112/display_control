import styles from "../stylesheets/articleStyles";
import * as React from "react";
import { useState } from "react";
import { Image, Text, View, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

export default ArticlePage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
  ]);

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

        <View style={[styles.showingAllArticleParent, styles.parentSpaceBlock]}>
          <Text style={[styles.showingAllArticle, styles.switchTypo]}>
            Showing All Article
          </Text>
          <View style={[styles.switchParent, styles.parentSpaceBlock]}>
            <Text style={[styles.switch, styles.switchTypo]}>switch</Text>
            <Image
              style={styles.vectorIcon}
              resizeMode="cover"
              source="Vector.png"
            />
          </View>
        </View>
        <View style={[styles.contentBoardChild, styles.parentSpaceBlock1]} />
      </View>
    </SafeAreaView>
  );
};
