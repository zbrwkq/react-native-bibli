
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

export default function AddItemScreen() {

    const [book, setBook] = useState({
        titre: "Les Misérables",
        auteur: "Victor Hugo",
        anneePublication: 1862,
        description: "Un roman historique et social qui se déroule dans la France du XIXe siècle, racontant l'histoire de rédemption de Jean Valjean, un ancien forçat, et explorant les injustices de l'époque.",
        imageCouverture: "https://exemple.com/images/les-miserables.jpg"
    });

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Titre: {book.titre}</Text>
        <Text>Auteur: {book.auteur}</Text>
        <Text>Année de publication: {book.anneePublication}</Text>
        <Text>Description: {book.description}</Text>
        <Image source={{ uri: book.imageCouverture }} style={{ width: 200, height: 200 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
