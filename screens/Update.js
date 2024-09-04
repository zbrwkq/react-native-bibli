import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const UpdateScreen = ({ navigation }) => {
  const route = useRoute();
  const [book, setBook] = useState(null);
  const [bookInput, setBookInput] = useState({
    id: "",
    title: "",
    author: "",
    year: "",
    description: "",
    cover: "",
  });
  const { bookId } = route.params;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.20:5000/books/" + bookId
        );
        setBook(response.data);
        setBookInput(response.data);
      } catch (error) {
        console.log(
          "Une erreur est survenue lors de la récupération du livre",
          error
        );
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (key, value) => {
    setBookInput({ ...bookInput, [key]: value });
  };

  const updateBook = async () => {
    try {
      const response = await axios.put(
        "http://192.168.1.20:5000/books/" + bookId,
        bookInput
      );
      setBook(response.data);
    } catch (error) {
      console.log(
        "Une erreur est survenue lors de la mise a jour du livre",
        error
      );
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mettre à jour le livre</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={bookInput.title}
        onChangeText={(value) => handleChange("title", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Auteur"
        value={bookInput.author}
        onChangeText={(value) => handleChange("author", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Année de publication"
        value={bookInput.year}
        onChangeText={(value) => handleChange("year", value)}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={bookInput.description}
        onChangeText={(value) => handleChange("description", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="URL de l'image de couverture"
        value={bookInput.cover}
        onChangeText={(value) => handleChange("cover", value)}
      />

      <Button title="Mise à jour" onPress={updateBook} />

      <Text style={styles.templateAuthor}>Stylisé par Damien</Text>
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
  cover: {
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});

export default UpdateScreen;
