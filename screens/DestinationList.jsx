import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Axios from 'axios';


export default function DestinationList({ navigation }) {

  const [destinations, setDestinations] = useState([]);

  // useEffect que se ejecuta cada vez que entra en foco esta screen
  useFocusEffect(
    React.useCallback(() => {
      Axios.get('http://172.20.10.3:8000/destinations')
        .then((response) => {
          const sortedDestinations = response.data.sort((a, b) => a.name.localeCompare(b.name));
          setDestinations(sortedDestinations);
        }, [])
        .catch((error) => console.error(error));
    })
  );

  const handleDelete = (id) => {
    fetch(`http://172.20.10.3:8000/destinations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setDestinations(destinations.filter((destination) => destination.id !== id));
        }
      })
      .catch((error) => console.error(error));
  }

  const getLabelColor = (difficulty) => {
    switch (difficulty) {
      case 'hard':
        return '#9861ff';
      case 'medium':
        return '#ffd261';
      case 'easy':
        return '#a8ff61';
      default:
        return 'white';
    }
  };

  const handleLike = (id) => {
    const destination = destinations.find((destination) => destination.id === id);
    const updatedDestination = { ...destination, isFavorite: !destination.isFavorite };

    fetch(`http://172.20.10.3:8000/destinations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDestination),
    })
      .then((response) => {
        if (response.ok) {
          setDestinations(destinations.map((destination) => destination.id === id ? updatedDestination : destination));
        }
      })
      .catch((error) => console.error(error));



  }

  const getFavoriteColor = (isFavorite) => {

    if (Platform.OS === 'ios') {
      return isFavorite ? 'red' : 'black';

    } else if (Platform.OS === 'android') {
      return isFavorite ? 'yellow' : 'black';
    }
  }


  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.destinationsList}
        data={destinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.destinationItem}>
            <Text style={[styles.destinationLabel,
            { backgroundColor: getLabelColor(item.difficulty) }
            ]}>{item.difficulty}
            </Text>
            <Text style={styles.destinationItemText}>{item.name}</Text>

            <View style={styles.destinationItemControls}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("DestinationEdit",
                { item: item })}>
                <Ionicons name="create-outline" size={24} color="black" />
              </TouchableOpacity>


              <TouchableOpacity style={styles.favoriteButton} onPress={() => handleLike(item.id)}>
                <Ionicons name={Platform.OS === 'ios' ? 'heart-outline' : 'star-outline'}
                  size={24}
                  color={getFavoriteColor(item.isFavorite)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61b5ff',
  },

  destinationsList: {
    width: '100%',
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  destinationItem: {
    width: 300,
    marginBottom: 30,
    height: 150,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
  },

  destinationItemText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },

  destinationLabel: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: 70,
    borderRadius: 20,
    marginBottom: 10,
  },

  destinationItemControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },

  editButton: {
    backgroundColor: "none",
    padding: 10,
  },

  deleteButton: {
    backgroundColor: "none",
    padding: 10,
  },

  favoriteButton: {
    backgroundColor: "none",
    padding: 10,
  }
});