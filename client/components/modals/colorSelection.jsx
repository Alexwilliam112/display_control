import * as React from "react";
import { Image, Text, View, Pressable, Modal } from "react-native";
import styles from "../../stylesheets/colorSelectStyles";

export default ColorSelection = ({ modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType=""
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.color09overlay}>
          <View style={[styles.color00, styles.parentFlexBox]}>
            <Text style={styles.selectColor}>Select Color</Text>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                style={styles.closeButton}
                resizeMode="cover"
                source={require("../../assets/closeButton.png")}
              />
            </Pressable>
          </View>
          <View style={styles.frameParent}>
            
            <Pressable
              style={[styles.ckMallPondokIndahParent, styles.parentFlexBox]}
            >
              <Text style={styles.ckMallPondok}>Select Color</Text>
              <Image
                style={styles.checkIcon}
                resizeMode="cover"
                source={require("../../assets/checkIcon.png")}
              />
            </Pressable>

          </View>
          <View style={[styles.defaultButtonsParent, styles.parentFlexBox]}>
            <View style={[styles.defaultButtons, styles.defaultBorder]}>
              <Text style={[styles.remove, styles.removeTypo]}>REMOVE</Text>
            </View>
            <View style={[styles.defaultButtons1, styles.defaultBorder]}>
              <Text style={[styles.confirm, styles.removeTypo]}>CONFIRM</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
