import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");

  const addBook = async () => {
    if (title.trim() && author.trim() && year.trim() && description.trim() && cover.trim()) {
      const newBook = {
        title,
        author,
        year,
        description,
        cover,
      };

      try {
        await axios.post('http://192.168.1.102:5000/books', newBook);

        setTitle("");
        setAuthor("");
        setYear("");
        setDescription("");
        setCover("");

        navigation.goBack();
      } catch (error) {
        console.error("Erreur lors de l'enregistrement des livres", error);
      }
    } else {
      Alert.alert(
        "Champs Manquants",
        "Veuillez remplir tous les champs avant d'ajouter le livre.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ajouter un nouveau livre</Text>

      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Auteur"
        value={author}
        onChangeText={setAuthor}
      />

      <TextInput
        style={styles.input}
        placeholder="Année de publication"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="URL de l'image de couverture"
        value={cover}
        onChangeText={setCover}
      />

      <Button title="Ajouter" onPress={addBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});
