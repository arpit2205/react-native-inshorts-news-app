import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import { NewsContext } from "../API/Context";
import { Entypo } from "@expo/vector-icons";

import SingleNews from "./SingleNews";

const Search = () => {
  const {
    news: { articles },
    darkTheme,
  } = useContext(NewsContext);

  const [searchResults, setSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNews, setcurrentNews] = useState();

  const handleSearch = (text) => {
    if (!text) {
      setSearchResults([]);
      return;
    }

    setSearchResults(
      articles.filter((article) => {
        return article.title.toLowerCase().includes(text.toLowerCase());
      })
    );
  };

  const handleModal = (n) => {
    setModalVisible(true);
    setcurrentNews(n);
  };

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <TextInput
        style={{
          ...styles.search,
          backgroundColor: darkTheme ? "black" : "lightgrey",
          color: darkTheme ? "white" : "black",
        }}
        onChangeText={(text) => {
          handleSearch(text);
        }}
        placeholder="Search news"
        placeholderTextColor={darkTheme ? "white" : "black"}
      />

      <View style={styles.searchResults}>
        {searchResults.slice(0, 10).map((n) => (
          <TouchableOpacity
            key={n.title}
            activeopacity={0.7}
            onPress={() => handleModal(n)}
          >
            <Text
              style={{
                ...styles.singleResult,
                backgroundColor: darkTheme ? "black" : "white",
                color: darkTheme ? "white" : "black",
              }}
            >
              {n.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            position: "absolute",
            zIndex: 2,
            right: 0,
            margin: 10,
            marginTop: 60,
          }}
        >
          <Entypo name="circle-with-cross" size={30} color="white" />
        </TouchableOpacity>
        <View style={{ height: "100%", transform: [{ scaleY: -1 }] }}>
          <SingleNews item={currentNews} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15,
  },

  searchResults: {
    position: "absolute",
    top: 50,
    zIndex: 1,
  },

  singleResult: {
    borderRadius: 5,
    padding: 10,
    margin: 0.5,
    shadowColor: "black",
    elevation: 5,
  },
});

export default Search;
