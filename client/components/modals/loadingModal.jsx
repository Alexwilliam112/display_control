import * as React from "react";
import { Image, Text, View, Pressable, Modal } from "react-native";
import styles from "../../stylesheets/colorSelectStyles";

export default LoadingModal = ({ loadingSubmit }) => {
  return (
    <Modal
      animationType=""
      transparent={true}
      visible={loadingSubmit}
      onRequestClose={() => console.log("None")}
    >
      <View style={styles.modalContainer}>
        <View style={styles.color09overlay}>
          <View style={[styles.color00, styles.parentFlexBox]}></View>
          <View style={styles.frameParent}>
            <Text style={styles.selectColor}>LOADING SUBMISSION</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
