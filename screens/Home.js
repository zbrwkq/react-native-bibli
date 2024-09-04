import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(async () => {
    const fetchBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem("books");
        setBooks(JSON.parse(storedBooks));
      } catch (error) {
        console.log(
          "Une erreur est survenue lors de la récupération des livres",
          error
        );
      }
    };

    fetchBooks();
  }, [AsyncStorage.getItem("books")]);

  const confirmDelete = (bookId) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer ce livre?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: () => deleteBook(bookId) },
      ]
    );
  };

  const deleteBook = async (bookId) => {
    try {
      const updatedBooks = books.filter((book) => book.id !== bookId);
      setBooks(updatedBooks);
      await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
    } catch (error) {
      console.log(
        "Une erreur est survenue lors de la suppression du livre",
        error
      );
    }
  };

  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.cover }} style={styles.coverImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>par {item.author}</Text>
        <View style={styles.buttons}>
          <Button
            title="Modifier"
            onPress={() =>
              navigation.navigate("UpdateBook", {
                bookId: item.id,
              })
            }
          />
          <Button title="Supprimer" onPress={() => confirmDelete(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={books} renderItem={renderBookItem} />
      <Button
        title="Ajouter un livre"
        onPress={() => navigation.navigate("AddBook")}
      />

      <Text style={styles.templateAuthor}>Stylisé par Romain</Text>
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

export default HomeScreen;
