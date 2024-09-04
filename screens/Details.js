
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const DetailsScreen = ({route, navigation}) => {
  const { bookId } = route.params;

  const [book, setBook] = useState(null);

  const deleteBook = (bookId) => {
    const storedBooks = AsyncStorage.getItem('books');
    const books = JSON.parse(storedBooks) || [];
    const updatedBooks = books.filter((b) => b.id !== bookId);
    AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
    navigation.navigate('Home');
  }

  useEffect(() => {
    const fetchBookById = async () => {
      const storedBooks = await AsyncStorage.getItem('books');
      const books = JSON.parse(storedBooks) || [];
      const selectedBook = books.find((b) => b.id === bookId);
      setBook(selectedBook);
    };

    fetchBookById();
  }, [itemId]);
  
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Titre: {book.titre}</Text>
        <Text>Auteur: {book.auteur}</Text>
        <Text>Année de publication: {book.anneePublication}</Text>
        <Text>Description: {book.description}</Text>
        <Image source={{ uri: book.imageCouverture }} style={{ width: 200, height: 200 }} />
        <Button onPress={() => navigation.navigate('Edit', { bookId })}>Modifier</Button>
        <Button onPress={() => deleteBook(bookId)}>Supprimer</Button>
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

export default DetailsScreen;