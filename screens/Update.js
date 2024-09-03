import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const UpdateScreen = ({ navigation }) => {
  const route = useRoute();
  const [book, setBook] = useState([]);
  const { bookId } = route.params;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem("books");
        const book = JSON.parse(storedBooks).find((b) => b.id === bookId);
        if (book) {
          setBook(book);
        } else {
          navigation.goBack();
        }
      } catch (error) {
        console.log(
          "Une erreur est survenue lors de la récupération des livres",
          error
        );
      }
    };

    fetchBook();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  templateAuthor: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  bookItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
  },
  coverImage: {
    width: 60,
    height: 90,
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default UpdateScreen;
