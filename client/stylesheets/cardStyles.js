import { StyleSheet } from "react-native";

export default StyleSheet.create({
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  articleNumber: {
    fontSize: 15,
    color: "#000",
    textAlign: "left",
  },
  cardContainer: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 3,
    shadowOpacity: 1,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#efefef",
    borderWidth: 1,
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 183,
    height: 155,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    boxSize: "border-box",
    marginHorizontal: 5,
  },
  cardContainerSelected: {
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 3,
    shadowOpacity: 1,
    borderRadius: 18,
    backgroundColor: "#74CDFF",
    borderStyle: "solid",
    borderColor: "#efefef",
    borderWidth: 1,
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 183,
    height: 155,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 10,
    boxSize: "border-box",
    marginHorizontal: 5,
  },
});
