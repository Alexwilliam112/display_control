import styles from "../stylesheets/homeStyles";
import * as React from "react";
import { Image, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default Homepage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.landingPage}>
      <View style={[styles.header, styles.headerFlexBox]}>
        <Text style={[styles.checklist, styles.checklistTypo]}>
          Display Control
        </Text>
      </View>
      <View style={[styles.contentBoard, styles.headerFlexBox]}>
        <Pressable
          style={styles.contentShadowBox}
          onPress={() => navigation.navigate("articlePage")}
        >
          <View style={styles.informations}>
            <Text style={[styles.ramChecklist, styles.checklistTypo]}>
              Rotation
            </Text>
            <View style={styles.informationsChild} />
            <Text style={styles.checklistForRam}>Display Changes Update</Text>
          </View>
          <Image
            source={require("../assets/rotation.png")}
            style={styles.contentBoxChild}
          />
        </Pressable>
        <View style={[styles.contentBox1, styles.contentShadowBox]}>
          <View style={styles.informations}>
            <Text style={[styles.ramChecklist, styles.checklistTypo]}>
              Optimal Display
            </Text>
            <View style={styles.informationsChild} />
            <Text style={styles.checklistForRam}>Optimal Display Capacity</Text>
          </View>
          <Image
            source={require("../assets/rotation.png")}
            style={styles.contentBoxChild}
          />
        </View>
      </View>
      <View style={styles.addButton} />
    </SafeAreaView>
  );
};
