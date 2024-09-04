import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from "axios";

const DetailsScreen = ({ route, navigation }) => {
  const { bookId } = route.params;

  const [book, setBook] = useState(null);
  const [bookInput, setBookInput] = useState({
    id: "",
    title: "",
    author: "",
    year: "",
    description: "",
    cover: "",
  });

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://192.168.1.19:5000/books/${bookId}`);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Une erreur est survenue lors de la suppression du livre", error);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://192.168.1.19:5000/books/${bookId}`);
        
        if (response) {
          setBook(response.data)
          setBookInput(response.data);
        } else {
          navigation.goBack();
        }
      } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des livres", error);
      }
    };

    fetchBook();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: bookInput.cover }} style={styles.coverImage} />
      <Text style={styles.title}>{bookInput.title}</Text>
      <Text style={styles.author}>Auteur: {bookInput.author}</Text>
      <Text style={styles.year}>Année de publication: {bookInput.year}</Text>
      <Text style={styles.description}>{bookInput.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateBook', { bookId })}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteBook(bookId)}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.templateAuthor}>Stylisé par Corentin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  templateAuthor: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },
  coverImage: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '75%',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});


export default DetailsScreen;
