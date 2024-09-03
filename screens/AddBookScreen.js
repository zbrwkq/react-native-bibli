import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const addBook = async () => {
    if (title.trim() && author.trim() && year.trim() && description.trim() && coverImage.trim()) {
      const newBook = {
        title,
        author,
        year,
        description,
        coverImage,
      };

      try {
        const storedBooks = await AsyncStorage.getItem('books');
        const books = storedBooks ? JSON.parse(storedBooks) : [];
        
        const lastId = books.length ? Math.max(...books.map(book => book.id)) : 0;
        const newId = lastId + 1;
        newBook.id = newId;
        
        const updatedBooks = [...books, newBook];
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));

        setTitle('');
        setAuthor('');
        setYear('');
        setDescription('');
        setCoverImage('');
        navigation.goBack();
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des livres', error);
      }
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
        value={coverImage}
        onChangeText={setCoverImage}
      />

      <Button title="Ajouter" onPress={addBook} />

      <Text style={styles.templateAuthor}>Stylisé par Nathan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  templateAuthor: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
   },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  coverImage: {
    width: 100,
    height: 150,
    marginVertical: 10,
    alignSelf: 'center',
  },
});
