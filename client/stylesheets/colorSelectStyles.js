import { StyleSheet } from "react-native";

export default StyleSheet.create({
  closeButton: {
    height: 18,
    width: 18,
  },
  checkIcon: {
    height: 14,
    width: 14,
  },
  parentFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  defaultBorder: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: 125,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    flexDirection: "row",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
  },
  removeTypo: {
    fontSize: 12,
    textAlign: "left",
  },
  selectColor: {
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "600",
    textAlign: "center",
    color: "#000",
  },
  color00: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderColor: "#e2e2e2",
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 48,
    borderStyle: "solid",
    flexDirection: "row",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  ckMallPondok: {
    fontSize: 13,
    textAlign: "left",
    color: "#000",
  },
  frameChild: {
    backgroundColor: "#d9d9d9",
    width: 15,
    height: 10,
    marginLeft: 149,
  },
  ckMallPondokIndahParent: {
    borderColor: "#f3f3f3",
    borderTopWidth: 0.5,
    paddingHorizontal: 25,
    paddingVertical: 16,
    height: 48,
    borderStyle: "solid",
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  frameParent: {
    paddingHorizontal: 5,
    paddingBottom: 25,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  remove: {
    fontWeight: "500",
    color: "#000",
  },
  defaultButtons: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: 125,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
  },
  confirm: {
    fontWeight: "700",
    color: "#fff",
  },
  defaultButtons1: {
    backgroundColor: "#000",
    marginLeft: 10,
  },
  defaultButtonsParent: {
    justifyContent: "center",
  },
  color09overlay: {
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: 8,
    width: 300,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
    zIndex: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
